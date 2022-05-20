import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from 'react';
import { createPublication } from "../../aplication/commands/publications/create";
import { useSelector } from 'react-redux';
import { publicationsSelector } from "../../aplication/queries/publications-selector";
import { userInfoSelector } from '../../../app/application/queries/user-info-selector';
import { fetchFriendsPublications } from '../../aplication/commands/publications/fetch-friends-publications';
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Tooltip } from '@mui/material';
import { Guid } from "guid-typescript";
import { friendsSelector } from '../../aplication/queries/friends-selector';
import { getFriends } from '../../aplication/commands/friends/get-friends';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import { IUserInfo } from '../../../interfaces/user';
import { answerPublication } from "../../aplication/commands/publications/answer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { TPublicationLike } from '../../../interfaces/publication';
import { createReaction } from "../../aplication/commands/publications/create-reaction";
import "./Publication.css";

let isCalledFriendsPublication = false;
let isCalledFriends = false;

export default function Publications() {
    const [openCreateMessageDialog, setOpenCreateMessageDialog] = useState(false);
    const [openAnswerDialog, setOpenAnswerDialog] = useState(false);
    const [publicationContent, setPublicationContent] = useState("");
    const [answer, setAnswer] = useState("");
    const [publicationTitle, setPublicationTitle] = useState("");
    const [publicationIdAnswer, setPublicationIdAnswer] = useState("");
    const publications = useSelector(publicationsSelector);
    const userInfo = useSelector(userInfoSelector);
    const friends = useSelector(friendsSelector);

    const handleCloseCreatePublicationDialog = () => {
        setOpenCreateMessageDialog(false);
    }

    const handleCloseAnswerDialog = () => {
        setPublicationIdAnswer("");
        setOpenAnswerDialog(false);
    }

    const openAnswerHandler = (publicationId: string) => {
        setPublicationIdAnswer(publicationId);
        setOpenAnswerDialog(true);
    }

    useEffect(() => {
        if(userInfo?.email && !isCalledFriendsPublication){
            fetchFriendsPublications();
            isCalledFriendsPublication = true;
        }
        if(userInfo?.email && !isCalledFriends && friends?.length === 0) {
            isCalledFriends = true;
            getFriends();
        }
    }, [userInfo])


    return (
    <div className="publications-container">
        <Button onClick={e => setOpenCreateMessageDialog(true)}> Crear publicació </Button>
        <div className="publications-list">
            {friends?.length > 0 && publications?.length > 0 ? publications.map(p => {
                const persons: IUserInfo[] = [userInfo].concat(friends);
                const author: IUserInfo =  persons.find(f => f.email === p.emailUser) as any;
                const dislikes = p.likes?.filter(l => l.type === "Dislike");
                const hearts = p.likes?.filter(l => l.type === "Heart");
                const likes = p.likes?.filter(l => l.type === "Like");
                const stars = p.likes?.filter(l => l.type === "Star");
                const likeDisabled = likes.findIndex(l => l.emailUser === userInfo.email) != -1;
                const dislikeDisabled = dislikes.findIndex(l => l.emailUser === userInfo.email) != -1;
                const starDisabled = stars.findIndex(l => l.emailUser === userInfo.email) != -1;
                const heartDisabled = hearts.findIndex(l => l.emailUser === userInfo.email) != -1;
                return (
                    <Box>
                    <Card className="publication-item" sx={{"margin-bottom": 20}}>
                        <CardHeader avatar={
                            <Tooltip title={author?.nick as any || author?.email as any} arrow>
                                <Avatar src={author?.avatar}>
                                </Avatar>
                            </Tooltip>
                        }
                        action={
                        <IconButton>
                            <CommentIcon onClick={e => openAnswerHandler(p.id as any)} />
                        </IconButton>
                        }
                        title={p.title}
                        subheader={p.date.toString()}
                        />
                        {p.image ?       
                            <CardMedia
                                component="img"
                                height="194"
                                image={p.image}
                                alt={p.title}
                            /> 
                        : null}
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                {p.text}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton className="like-btn" property={likeDisabled ? "used": "unused"} onClick={e=> createReaction("Like", p.id as any)}>
                                <Typography>
                                    {likes.length || 0}
                                </Typography>
                                <ThumbUpIcon />
                            </IconButton>
                            <IconButton className="heart-btn" disabled={heartDisabled} onClick={e=> createReaction("Heart", p.id as any)}>
                                {hearts.length || 0}
                                <FavoriteIcon />
                            </IconButton>
                            <IconButton className="star-btn" disabled={starDisabled} onClick={e=> createReaction("Star", p.id as any)}>
                                {stars.length || 0}
                                <StarIcon />
                            </IconButton>
                            <IconButton className="dislike-btn" disabled={dislikeDisabled} onClick={e=> createReaction("Dislike", p.id as any)}>
                                {dislikes.length || 0}
                                <ThumbDownIcon />
                            </IconButton>
                        </CardActions>
                        <CardContent>
                            <Typography variant="h6">Respostes ({p.answers?.length || 0})</Typography>
                            <List>
                            {(p.answers || []).map(answer => {
                                const resAuthor: IUserInfo =  persons.find(f => f.email === answer.emailUser) as any;
                                return (
                                    <ListItem divider>
                                        <ListItemAvatar >
                                            <Tooltip title={resAuthor.nick || resAuthor.email} arrow>
                                                <Avatar sx={{ width: 26, height: 26 }} src={resAuthor.avatar}></Avatar>
                                            </Tooltip>
                                        </ListItemAvatar>
                                        <ListItemText primary={answer.date.toString()} secondary={answer.text}/>

                                    </ListItem>
                                )
                            })}
                            </List>
                        </CardContent>
                        
                    </Card>
                    
                    </Box>
                )
            }) : null}
            
        </div>
        <Dialog open={openAnswerDialog} onClose={handleCloseAnswerDialog}>
                <DialogTitle>Crear una resposta</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Per crear una una resposta has d'introduir el contingut
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Resposta"
                        multiline
                        fullWidth
                        minRows={5}
                        variant="standard"
                        onChange={e => setAnswer(e.currentTarget.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCloseAnswerDialog}>Cancel·lar</Button>
                    <Button disabled={!answer} color="success" onClick={e => answerPublication(answer, publicationIdAnswer)}>Crear resposta</Button>
                </DialogActions>
        </Dialog>
        <Dialog open={openCreateMessageDialog} onClose={handleCloseCreatePublicationDialog}>
                <DialogTitle>Crear publicació</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Per crear una publicació has d'introduir el contingut
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Títol"
                        fullWidth
                        variant="standard"
                        onChange={e => setPublicationTitle(e.currentTarget.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Contingut"
                        multiline
                        fullWidth
                        minRows={5}
                        variant="standard"
                        onChange={e => setPublicationContent(e.currentTarget.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="error" onClick={handleCloseCreatePublicationDialog}>Cancel·lar</Button>
                    <Button disabled={!publicationContent || !publicationTitle} color="success" onClick={e => createPublication(publicationTitle, publicationContent)}>Crear publicació</Button>
                </DialogActions>
        </Dialog>
    </div>)
}

