import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { userInfoSelector } from '../../../app/application/queries/user-info-selector';
import { getFriends } from "../../aplication/commands/friends/get-friends";
import { removeFriend } from "../../aplication/commands/friends/remove-friend";
import { friendsSelector } from "../../aplication/queries/friends-selector";
import { useState } from 'react';
import { ConfirmationDialog } from "../../../core/components/ConfirmDialog/ConfirmDialog";
import { useNavigate } from 'react-router-dom';
import { getChatDetail } from "../../aplication/commands/chats/get-detail";

let serviceFriendCalled = false;

export default function Friends(){
    const friends = useSelector(friendsSelector);
    const userInfo = useSelector(userInfoSelector);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [currentEmailFriend, setCurrentEmailFriend] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if(!serviceFriendCalled && userInfo?.email){
            serviceFriendCalled =true;
            getFriends();
        }
    }, [userInfo]);

    const removeFriendHandler = (friendEmail: string) => {
        setCurrentEmailFriend(friendEmail);
        setOpenConfirm(true);
    }

    const sendMessageHandler = (friendEmail: string) => {
        getChatDetail(friendEmail).then(r => {
            navigate("/social/messages/detail");
        })
    }

    return (
        <div className="container">
            <h1>Llista d'amistats ({friends?.length || 0})</h1>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {friends.map(f => {     
                    return (
                    <ListItem alignItems="flex-start"          
                        divider={true}
                        key={f.email}
                        secondaryAction={
                            <div>
                                <Button startIcon={<SendIcon />} variant="contained" onClick={e => sendMessageHandler(f.email)}>
                                    Veure el xat
                                </Button>
                                <Button color="error" startIcon={<DeleteIcon />} sx={{"margin-left": 7}} variant="outlined" onClick={e => removeFriendHandler(f.email)}>
                                    Desfer amistat
                                </Button>
                            </div>
                      }>
                            <ListItemAvatar>
                                <Avatar alt={f.name} src={f.avatar} sx={{ width: 75, height: 75, "margin-right": 30 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={f.nick || f.email}
                                secondary={
                                    <React.Fragment>
                                        <Typography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                            {f.name} {f.surname} 
                                        </Typography>
                                        <br></br>
                                        {f.description}
                                    </React.Fragment>
                                }/>
                        </ListItem>
                    )
                })}
                <ConfirmationDialog setOpen={setOpenConfirm} open={openConfirm} message="Estas segur que vols desfer l'amistat?" title="Confirmació" onClose={() => null} onAccept={() => removeFriend(currentEmailFriend).then(r => setOpenConfirm(false))}></ConfirmationDialog>
            </List>
        </div>)
}