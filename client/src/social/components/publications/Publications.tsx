import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from 'react';
import { createPublication } from "../../aplication/commands/publications/create";

let isCalledPublication = false;
export default function Publications() {
    const [openCreateMessageDialog, setOpenCreateMessageDialog] = useState(false);
    const [publicationContent, setPublicationContent] = useState("");

    const handleCloseCreatePublicationDialog = () => {
        setOpenCreateMessageDialog(false);
    }


    return (<div className="publications-container">
        <Button onClick={e => setOpenCreateMessageDialog(true)}> Crear publicació </Button>
        <Dialog open={openCreateMessageDialog} onClose={handleCloseCreatePublicationDialog}>
                <DialogTitle>Crear publicació</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Per crear una publicació has d'introduir el contingut
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Correu electrònic"
                        multiline
                        fullWidth
                        minRows={5}
                        variant="standard"
                        onChange={e => setPublicationContent(e.currentTarget.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCloseCreatePublicationDialog}>Cancel·lar</Button>
                    <Button disabled={!publicationContent} color="success" onClick={e => createPublication(publicationContent)}>Crear publicació</Button>
                </DialogActions>
            </Dialog>
    </div>)
}