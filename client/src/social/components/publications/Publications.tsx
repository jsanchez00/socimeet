import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../app/application/queries/user-info-selector";
import { TPublicationLike } from "../../../interfaces/publication";
import { getFriends } from "../../aplication/commands/friends/get-friends";
import { answerPublication } from "../../aplication/commands/publications/answer";
import { createPublication } from "../../aplication/commands/publications/create";
import { createReaction } from "../../aplication/commands/publications/create-reaction";
import { deleteReaction } from "../../aplication/commands/publications/delete-reaction";
import { fetchFriendsPublications } from "../../aplication/commands/publications/fetch-friends-publications";
import { friendsSelector } from "../../aplication/queries/friends-selector";
import { publicationIdsSelector } from "../../aplication/queries/publications-selector";
import Publication from "./Publication";
import "./Publication.css";

let isCalledFriendsPublication = false;
let isCalledFriends = false;

export default function Publications() {
  const [openCreateMessageDialog, setOpenCreateMessageDialog] = useState(false);
  const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
  const [publicationIdAnswer, setPublicationIdAnswer] = useState("");
  const publicationsIds = useSelector(publicationIdsSelector);
  const userInfo = useSelector(userInfoSelector);
  const friends = useSelector(friendsSelector);

  const handleCloseCreatePublicationDialog = () => {
    setOpenCreateMessageDialog(false);
  };

  const handleCloseAnswerDialog = () => {
    setPublicationIdAnswer("");
    setOpenAnswerDialog(false);
  };

  useEffect(() => {
    if (userInfo?.email && !isCalledFriendsPublication) {
      fetchFriendsPublications();
      isCalledFriendsPublication = true;
    }
    if (userInfo?.email && !isCalledFriends && friends?.length === 0) {
      isCalledFriends = true;
      getFriends();
    }
  }, [userInfo]);

  return (
    <div className="publications-container">
      <div className="publications-header">
        <h1>Publicacions</h1>
        <Button
          startIcon={<AddCircleOutlineIcon />}
          sx={{ height: 50, "margin-top": 20 }}
          variant="contained"
          onClick={(e) => setOpenCreateMessageDialog(true)}
        >
          Crear publicació
        </Button>
      </div>
      <div className="publications-list">
        {publicationsIds?.length > 0
          ? publicationsIds.map((id, key) => {
              return (
                <Publication
                  publicationIdAnswerProps={[
                    publicationIdAnswer,
                    setPublicationIdAnswer,
                  ]}
                  key={key}
                  publicationId={id as any}
                  openAnswerDialogProps={[
                    openAnswerDialog,
                    setOpenAnswerDialog,
                  ]}
                ></Publication>
              );
            })
          : null}
      </div>
      <AnswerDialog
        openAnswerDialogProps={[openAnswerDialog, setOpenAnswerDialog]}
        handleCloseAnswerDialog={handleCloseAnswerDialog}
        publicationIdAnswer={publicationIdAnswer}
      ></AnswerDialog>
      <NewPublicationDialog
        openCreateMessageDialog={openCreateMessageDialog}
        handleCloseCreatePublicationDialog={handleCloseCreatePublicationDialog}
      ></NewPublicationDialog>
    </div>
  );
}

interface INewPublicationDialog {
  openCreateMessageDialog: boolean;
  handleCloseCreatePublicationDialog: any;
}

function NewPublicationDialog(props: INewPublicationDialog) {
  const openCreateMessageDialog = props.openCreateMessageDialog;
  const handleCloseCreatePublicationDialog =
    props.handleCloseCreatePublicationDialog;
  const [publicationContent, setPublicationContent] = useState("");
  const [publicationTitle, setPublicationTitle] = useState("");
  const [publicationImage, setPublicationImage] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageChange = (e: any) => {
    if (e.target.files) {
      setImageName(e.target.files[0]?.name);
    } else {
      setImageName("");
    }
    setPublicationImage(e.target.files);
  };

  const handleCloseDialog = () => {
    resetFields();
    handleCloseCreatePublicationDialog();
  };

  const resetFields = () => {
    setPublicationContent("");
    setPublicationTitle("");
    setPublicationImage("");
    setImageName("");
  };

  return (
    <Dialog
      open={openCreateMessageDialog}
      onClose={handleCloseCreatePublicationDialog}
      fullWidth
    >
      <DialogTitle>Crear publicació</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Títol"
          fullWidth
          variant="standard"
          onChange={(e) => setPublicationTitle(e.currentTarget.value)}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Contingut"
          multiline
          fullWidth
          minRows={5}
          variant="standard"
          onChange={(e) => setPublicationContent(e.currentTarget.value)}
        />
        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Box sx={{ fontWeight: 500 }}>{imageName}</Box>
          <label className="label-upload">
            <AttachmentIcon></AttachmentIcon>
            Afegir una imatge
            <input
              id="avatar-file-input"
              type="file"
              name="publicationImage"
              onChange={handleImageChange}
              accept="image/png,image/jpeg,image/jpg"
            />
          </label>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={handleCloseDialog}>
          Cancel·lar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={(e) =>
            createPublication(
              publicationTitle,
              publicationContent,
              publicationImage
            ).then((r) => handleCloseDialog())
          }
        >
          Crear publicació
        </Button>
      </DialogActions>
    </Dialog>
  );
}

interface IAnswerDialogProps {
  openAnswerDialogProps: any;
  handleCloseAnswerDialog: any;
  publicationIdAnswer: string;
}

function AnswerDialog(props: IAnswerDialogProps) {
  const [openAnswerDialog, setOpenAnswerDialog] = props.openAnswerDialogProps;
  const handleCloseAnswerDialog = props.handleCloseAnswerDialog;
  const publicationIdAnswer = props.publicationIdAnswer;

  const answerPublicationHandler = (e: any) => {
    answerPublication(answer, publicationIdAnswer).then((r) =>
      setOpenAnswerDialog(false)
    );
  };

  const onCloseDialog = (e: any) => {
    setAnswer("");
    handleCloseAnswerDialog();
  };

  const [answer, setAnswer] = useState("");
  return (
    <Dialog open={openAnswerDialog} onClose={handleCloseAnswerDialog} fullWidth>
      <DialogTitle>Crear una resposta</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Escriu la resposta"
          multiline
          fullWidth
          minRows={5}
          variant="standard"
          onChange={(e) => setAnswer(e.currentTarget.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onCloseDialog}>
          Cancel·lar
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={!answer}
          onClick={answerPublicationHandler}
        >
          Crear resposta
        </Button>
      </DialogActions>
    </Dialog>
  );
}
