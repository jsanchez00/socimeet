import ChatIcon from '@mui/icons-material/Chat';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { Badge, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material";
import { useNavigate, Routes, Route } from 'react-router-dom';
import "./Social-shell.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState, useEffect } from 'react';
import { sendFriendRequest } from "../../aplication/commands/send-friend-request";
import { useSelector } from "react-redux";
import { userInfoSelector } from "../../../app/application/queries/user-info-selector";
import PersonIcon from '@mui/icons-material/Person';
import { fetchFriendsRequests } from "../../aplication/commands/fetch-friend-requests";
import { friendsRequestPendingSelector, friendsRequestSelector } from "../../aplication/queries/friend-requests-pending-selector";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { declineRequest } from "../../aplication/commands/decline-request";
import { acceptRequest } from "../../aplication/commands/accept-request";
import Friends from '../friends/Friends';
import ChatShell from '../chat-shell/ChatShell';
import Publications from "../publications/Publications";

export default function SocialShell(){
    const [openAddFriendDialog, setOpenAddFriendDialog] = useState(false);
    const [openPendingFriendsDialog, setOpenPendingFriendsDialog] = useState(false);
    const [emailToRequest, setEmailToRequest] = useState("");
    const userInfo = useSelector(userInfoSelector);
    const pendingFriendsRequest = useSelector(friendsRequestPendingSelector);
    const friendsRequest = useSelector(friendsRequestSelector);

    useEffect(() => {
        if(userInfo.email)
            fetchFriendsRequests();
    }, [userInfo]);

    const handleClickOpenFriendDialog = () => {
        setOpenAddFriendDialog(true);
    };

    const handleCloseFriendDialog = () => {
        setOpenAddFriendDialog(false);
    };

    const handleClickOpenPendingFriendsDialog = () => {
        setOpenPendingFriendsDialog(true);
    };
    
    const handleClosePendingFriendsDialog = () => {
        setOpenPendingFriendsDialog(false);
    };

    const onClickSendFriendRequest = () => {
        sendFriendRequest(userInfo.email, emailToRequest).then(r => setOpenAddFriendDialog(false));
    }

    const navigate = useNavigate()
    let pendingFriendsRequestButton;

    if(pendingFriendsRequest.length > 0){
        pendingFriendsRequestButton = <div className="icon-button received-request-button" onClick={handleClickOpenPendingFriendsDialog}>
        <Badge color="primary" badgeContent={pendingFriendsRequest.length}>
            <PersonIcon></PersonIcon>
        </Badge>
        <span>Sol·licituds d'amistat</span>
    </div>;
    }

    const statusLabelDic = {
        pending: "Pendent",
        rejected: "Cancel·lada",
        done: "Acceptada"
    };

    return (
        <div>
            <Box
                sx={{
                    width: 100,
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
                }}>
            <div className="icon-button" onClick={e => navigate("publications")}>
                <ListAltIcon></ListAltIcon>
                <span>Publicacions</span>
            </div>
            <div className="icon-button" onClick={e => navigate("friends")}>
                <PeopleOutlineIcon></PeopleOutlineIcon>
                <span>Amistats</span>
            </div>
            <div className="icon-button" onClick={e => navigate("messages/list")}>
                <ChatIcon></ChatIcon>
                <span>Xats</span>
            </div>

            <div className="actions">
                <div className="icon-button" onClick={handleClickOpenFriendDialog}>
                    <PersonAddIcon></PersonAddIcon>
                    <span>Afegir amic</span>
                </div>
                {pendingFriendsRequestButton}
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
                    <Button variant="outlined" color="error" onClick={handleCloseFriendDialog}>Cancel·lar</Button>
                    <Button variant="contained" disabled={!emailToRequest} color="primary" onClick={onClickSendFriendRequest}>Enviar sol·licitud</Button>
                </DialogActions>
            </Dialog>

            <Dialog fullWidth open={openPendingFriendsDialog} onClose={handleClosePendingFriendsDialog} maxWidth="md">
                <DialogTitle>Sol·licituds pendents</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Aprova o declina les sol·licituds d'amistat pendents
                    </DialogContentText>
                    <List dense sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {friendsRequest.map((re, key) => {
                            return (
                                <ListItem key={key} sx={{gap: "20px"}}>
                                    <ListItemText primary="Sol·licitant" secondary={re.origin}></ListItemText>
                                    <ListItemText primary="Estat" secondary={statusLabelDic[re.status]}></ListItemText>
                                    <Button disabled={re.status !== "pending"} variant="contained" color="success" onClick={e => acceptRequest(re)} startIcon={<CheckIcon/>}>
                                        Acceptar petició
                                    </Button>
                                    <Button sx={{marginLeft: "20px"}} disabled={re.status !== "pending"} variant="outlined" color="error" onClick={e => declineRequest(re)} startIcon={<CloseIcon/>}>
                                        Declinar petició
                                    </Button>
                                </ListItem>
                            )
                        })}
                    </List>
                </DialogContent>
            </Dialog>
        </Box>
        <div className="social-shell-container">
            <Routes>
                <Route path="friends" element={<Friends />}></Route>
                <Route path="messages/*" element={<ChatShell />}></Route>
                <Route path="publications" element={<Publications/>}></Route>
            </Routes> 
        </div>
    </div>
    )
}