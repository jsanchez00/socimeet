import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, IconButton, Box } from '@mui/material';
import TextField from "@mui/material/TextField";
import { Guid } from 'guid-typescript';
import { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { userInfoSelector } from '../../../../app/application/queries/user-info-selector';
import { IUserInfo } from '../../../../interfaces/user';
import { getChatDetail } from '../../../aplication/commands/chats/get-detail';
import { sendMessage } from '../../../aplication/commands/chats/send-message';
import { chatDetailSelector } from "../../../aplication/queries/chats-selectors";
import { findFriendSelector } from "../../../aplication/queries/friends-selector";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from "date-fns";
import SendIcon from '@mui/icons-material/Send';

function ChatMessage(props: IChatMessageProps) {
  const userInfo = useSelector(userInfoSelector);
  const transmitterInfo: Partial<IUserInfo> = (useSelector(findFriendSelector(props.transmitter)) as any ) || userInfo;

  return (
    <div>
      <ListItem key={Guid.create().toString()} alignItems="flex-start" divider={true}>
        <ListItemAvatar>
          <Avatar alt={transmitterInfo.nick || transmitterInfo.email} src={transmitterInfo.avatar}></Avatar>
        </ListItemAvatar>
        <ListItemText primary={props.date ? format(new Date(props.date), 'dd/MM/yyyy - HH:mm'): ''} secondary={props.text}></ListItemText>
      </ListItem>
    </div>
  );
}

export default function ChatDetail() {
  const detail = useSelector(chatDetailSelector);
  const navigate = useNavigate();
  const inputMessageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if(detail.friend)
        getChatDetail(detail.friend);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  if(!detail.friend)
    navigate("/social/messages/list");

  const onSendMessageHandler = () => {
    const message = inputMessageRef?.current?.value;
    if(message)
      sendMessage(message, detail.friend).then(r => {
        if(inputMessageRef && inputMessageRef.current)
          inputMessageRef.current.value = "";
      })
  }

  const onNavigateBackHandler= (e: any) => {
    navigate("/social/messages/list");
  }

  return (
    <div>
        <Box sx={{display: "flex", gap: "10px"}}>
          <IconButton onClick={onNavigateBackHandler} color="primary">
            <ArrowBackIcon/>
          </IconButton>
          <h1>Xat amb {detail.friend}</h1>
        </Box>
        <List>
          {detail?.messages.map((m, key) => <ChatMessage key={key} date={m.date} transmitter={m.transmitter} text={m.text} />)}
        </List>
        
        <Box sx={{display: "flex", flexDirection: "column", gap: "10px"}}>
          <TextField
            inputRef={inputMessageRef}
            label="Escriu un missatge"
            multiline
            maxRows={10}
            sx={{width: "100%"}}
          />
          <Button startIcon={<SendIcon />} sx={{width: "250px", alignSelf: "center"}} variant="contained" onClick={e => onSendMessageHandler()}>Enviar missatge</Button>
        </Box>
    </div>)
}

interface IChatMessageProps{
  date: any;
  transmitter: string;
  text: string;
  key: any;
}
