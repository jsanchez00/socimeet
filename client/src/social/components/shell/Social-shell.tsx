import ChatIcon from '@mui/icons-material/Chat';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import "./Social-shell.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from 'react';
import { sendFriendRequest } from "../../aplication/commands/send-friend-request";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../app/application/queries/user-info-selector";

export default function SocialShell(){
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);
    const [emailToRequest, setEmailToRequest] = useState("");
    const userInfo = useSelector(userInfoSelector);

    const handleClickOpenFriendDialog = () => {
        setOpenAddFriendDialog(true);
    };
    
    const handleCloseFriendDialog = () => {
        setOpenAddFriendDialog(false);
    };

    const onClickSendFriendRequest = () => {
        sendFriendRequest(userInfo.email, emailToRequest).then(r => setOpenAddFriendDialog(false));
    }

    const navigate = useNavigate()
    return (
        <Box
      sx={{
        width: 70,
        position: "absolute",
        top: 64,
        bottom: "0",
        left: "0",
        backgroundColor: '#f5f5f5;',
        display: "flex",
        "flex-direction": "column",
        gap: "10px",
        padding: "10px 0",
        "border-right": "1px solid #333"
      }}
    >
        <div className="icon-button" onClick={e => navigate("/social")}>
            <ListAltIcon></ListAltIcon>
            <span>Hitòries</span>
        </div>
        <div className="icon-button" onClick={e => navigate("friends")}>
            <PeopleOutlineIcon></PeopleOutlineIcon>
            <span>Amics</span>
        </div>
        <div className="icon-button" onClick={e => navigate("messages")}>
            <ChatIcon></ChatIcon>
            <span>Xats</span>
        </div>

        <div className="actions">
            <div className="icon-button" onClick={handleClickOpenFriendDialog}>
                <PersonAddIcon></PersonAddIcon>
                <span>Afegir amic</span>
            </div>
        </div>

        <Dialog open={openAddFriendDialog} onClose={handleCloseFriendDialog}>
            <DialogTitle>Afegir amic</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Per enviar una sol·licitud d'amistat has d'introduir el correu electrònic del destinatari
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Correu electrònic"
                    type="email"
                    fullWidth
                    variant="standard"
                    onChange={e => setEmailToRequest(e.currentTarget.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button color="error" onClick={handleCloseFriendDialog}>Cancel·lar</Button>
                <Button disabled={!emailToRequest} color="success" onClick={onClickSendFriendRequest}>Enviar sol·licitud</Button>
            </DialogActions>
        </Dialog>

    </Box>
    )
}