import { useSelector } from 'react-redux';
import { getChatList } from "../../../aplication/commands/chats/get-list";
import { chatListSelector } from '../../../aplication/queries/chats-selectors';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { useEffect } from 'react';
import { IMessageSummary } from '../../../../interfaces/message';
import { useNavigate } from 'react-router-dom';
import { getChatDetail } from '../../../aplication/commands/chats/get-detail';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText } from '@mui/material';
import { Guid } from 'guid-typescript';
import { findFriendSelector, friendsSelector } from '../../../aplication/queries/friends-selector';
import { getState } from "../../../../app/store";
import { getFriends } from "../../../aplication/commands/friends/get-friends";
import "./ChatList.css";

let serviceChatsCalled = false;
let serviceFriendsCalled = false;

export default function ChatList() {
    const list = useSelector(chatListSelector);
    const userInfo = useSelector(userInfoSelector);
    const navigate = useNavigate();
    const friends = useSelector(friendsSelector);

    useEffect(() => {
        if(!serviceChatsCalled && userInfo?.email){
            getChatList(userInfo.email);
            serviceChatsCalled = true;
        }
        if(!serviceFriendsCalled && userInfo?.email && friends?.length === 0){
            getFriends();
            serviceFriendsCalled = true;   
        }
    }, [userInfo])

    useEffect(() => {
        console.log(friends);
    }, [friends])
    
    const onClickChatHandler = (chatListItem: IMessageSummary) => {
        let friendEmail = chatListItem.transmitter;
        if(chatListItem.receiver !== userInfo?.email)
            friendEmail = chatListItem.receiver;
            getChatDetail(friendEmail).then(r => {
                navigate("/social/messages/detail");
            });
    }

  return (
    <div>
        <h1>Chats ({list.length || 0})</h1>
        <List>
        {friends?.length > 0 ? list.map(ch => {
            const friendEmail = userInfo.email !== ch.transmitter ? ch.transmitter : ch.receiver;
            const friend = findFriendSelector(friendEmail)(getState());
            
            return (
                <ListItem
                    className="item"
                    onClick={e => onClickChatHandler(ch)}
                    alignItems="flex-start"          
                    divider={true}
                    key={Guid.create().toString()}
                >
                    <ListItemAvatar>
                        <Avatar alt={friend?.nick || friend?.email} src={friend?.avatar}></Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={friend?.nick || friend?.email}></ListItemText>
                </ListItem>
            )
        }) : null}
        </List>
    </div>
    )
}
