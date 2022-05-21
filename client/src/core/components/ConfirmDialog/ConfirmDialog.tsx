import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

interface IProps {
    title: string;
    message: string;
    onClose: () => any;
    onAccept: () => any;
    open: boolean;
    setOpen: any;
}

export function ConfirmationDialog(props: IProps) {
    const { title,  message, onClose, onAccept, open, setOpen } = props;
  
    const handleCancel = () => {
        onClose();
        setOpen(false);
    };
  
    const handleOk = () => {
        onAccept();
        setOpen(false);
    };

  
    return (<div id="confirm">
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
            {message}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleCancel} color="error">
            Cancel·lar
          </Button>
          <Button variant="contained" onClick={handleOk}>Acceptar</Button>
        </DialogActions>
      </Dialog>
      </div>
    );
  }