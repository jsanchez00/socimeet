import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';
import React, { useEffect } from "react";
import { useSelector } from 'react-redux';
import { getFriends } from "../../aplication/commands/friends/get-friends";
import { friendsSelector } from "../../aplication/queries/friends-selector";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import { userInfoSelector } from '../../../app/application/queries/user-info-selector';

export default function Friends(){
    const friends = useSelector(friendsSelector);
    const userInfo = useSelector(userInfoSelector);

    useEffect(() => {
        if(friends?.length === 0 && userInfo?.email)
            getFriends();
    }, [friends, userInfo]);
    return (
        <div className="container">
            <h1>Llista d'amics ({friends?.length || 0})</h1>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {friends.map(f => {     
                    return (
                    <ListItem alignItems="flex-start"          
                        divider={true}
                        secondaryAction={
                            <div>
                                <IconButton edge="end" aria-label="comments">
                                <SendIcon />
                                </IconButton>
                                <IconButton edge="end" sx={{color: "red", "margin-left": 7}}>
                                    <DeleteIcon />
                                </IconButton>
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
            </List>
        </div>)
}