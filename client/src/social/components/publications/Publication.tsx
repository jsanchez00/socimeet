import { format } from 'date-fns'
import Avatar from "@mui/material/Avatar/Avatar";
import Card from "@mui/material/Card/Card";
import CardHeader from "@mui/material/CardHeader/CardHeader";
import IconButton, { IconButtonProps } from "@mui/material/IconButton/IconButton";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import { IPublicationExtended, TPublicationLike } from '../../../interfaces/publication';
import CommentIcon from '@mui/icons-material/Comment';
import CardMedia from "@mui/material/CardMedia/CardMedia";
import CardContent from "@mui/material/CardContent/CardContent";
import Typography from "@mui/material/Typography/Typography";
import { CardActions, List, ThemeProvider, ListItem, ListItemAvatar, ListItemText, styled, Collapse, Badge, BadgeProps } from '@mui/material';
import { theme } from "./theme";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { IUserInfo } from "../../../interfaces/user";
import { Guid } from 'guid-typescript';
import { userInfoSelector } from "../../../app/application/queries/user-info-selector";
import { friendsSelector } from "../../aplication/queries/friends-selector";
import { useSelector } from "react-redux";
import { useState } from 'react';
import { createReaction } from "../../aplication/commands/publications/create-reaction";
import { deleteReaction } from "../../aplication/commands/publications/delete-reaction";
import { findPublicationSelector } from "../../aplication/queries/publications-selector";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


interface IPublicationProps {
    publicationId: string;
    openAnswerDialogProps: any;
    key: any;
    publicationIdAnswerProps: any;
}

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: 10,
      top: 7,
      border: `1px solid ${theme.palette.background.paper}`,
    },
}));

  
const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function Publication(props: IPublicationProps){
    const [openAnswerDialog, setOpenAnswerDialog] = props.openAnswerDialogProps;
    const [publicationIdAnswer, setPublicationIdAnswer] = props.publicationIdAnswerProps; 
    const publication = useSelector(findPublicationSelector(props.publicationId));
    const userInfo = useSelector(userInfoSelector);
    const friends = useSelector(friendsSelector);
    const [expanded, setExpanded] = useState(false);

    const persons: IUserInfo[] = [userInfo].concat(friends);
    const author: IUserInfo =  persons.find(f => f.email === publication?.emailUser) as any;
    const dislikes = publication?.likes?.filter(l => l.type === "Dislike") || [];
    const hearts = publication?.likes?.filter(l => l.type === "Heart") || [];
    const likes = publication?.likes?.filter(l => l.type === "Like") ||[];
    const stars = publication?.likes?.filter(l => l.type === "Star") || [];
    const likeUsed = likes?.findIndex(l => l.emailUser === userInfo.email) != -1;
    const dislikeUsed = dislikes?.findIndex(l => l.emailUser === userInfo.email) != -1;
    const starUsed = stars?.findIndex(l => l.emailUser === userInfo.email) != -1;
    const heartUsed = hearts?.findIndex(l => l.emailUser === userInfo.email) != -1;

    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
    const openAnswerHandler = () => {
        setPublicationIdAnswer(publication.id)
        setOpenAnswerDialog(true);
    }

    const reactionHandler = (type: TPublicationLike, used: boolean) => {
        if(!used){
            createReaction(type, publication?.id as any);
        }
        else {
            deleteReaction(type, publication?.id as any);
        }
    }
    return publication && publication?.id ? (
        <Card key={props.key} className="publication-item" sx={{"margin-bottom": 20, width: 345}}>
            <CardHeader avatar={
                <Tooltip title={author?.nick as any || author?.email as any} arrow>
                    <Avatar src={author?.avatar}>
                        {author?.nick?.substring(0, 1) || author?.email?.substring(0,1)}
                    </Avatar>
                </Tooltip>
            }
            action={
            <IconButton onClick={e => openAnswerHandler()}>
                <CommentIcon />
            </IconButton>
            }
            title={publication?.title}
            subheader={publication?.date ? format(new Date(publication?.date), 'dd/MM/yyyy - HH:mm') : '' }
            />
            {publication?.image ?       
                <CardMedia
                    component="img"
                    height="194"
                    image={publication?.image}
                    alt={publication?.title}
                /> 
            : null}
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {publication?.text}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <ThemeProvider theme={theme}>
                    <IconButton className="like-btn" onClick={e=> reactionHandler("Like", likeUsed)}>
                        <Typography className="label-btn">
                            {likes?.length || 0}
                        </Typography>
                    <ThumbUpIcon color={likeUsed ? "primary" : "inherit"}/>
                    </IconButton>
                    <IconButton className="heart-btn" onClick={e=> reactionHandler("Heart", heartUsed)}>
                        <Typography className="label-btn">
                            {hearts?.length || 0}
                        </Typography>
                        <FavoriteIcon color={heartUsed ? "secondary" : "inherit"} />
                    </IconButton>
                    <IconButton className="star-btn" onClick={e=> reactionHandler("Star", starUsed)}>
                        <Typography className="label-btn">
                            {stars?.length || 0}
                        </Typography>
                        <StarIcon color={starUsed ? "info" : "inherit"} />
                    </IconButton>
                    <IconButton className="dislike-btn" onClick={e=> reactionHandler("Dislike", dislikeUsed)}>
                        <Typography className="label-btn">
                            {dislikes?.length || 0}
                        </Typography>
                        <ThumbDownIcon color={dislikeUsed ? "error" : "inherit"} />
                    </IconButton>
                    {publication?.answers?.length > 0 ? (
                        <StyledBadge className="badge" sx={{marginLeft: "auto"}} badgeContent={publication?.answers?.length || 0} color="primary">
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                            >
                                <ExpandMoreIcon />
                        </ExpandMore>
                    </StyledBadge>
                    ) : null}
                </ThemeProvider>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography variant="h6">Respostes ({publication?.answers?.length || 0})</Typography>
                    <List>
                        {(publication?.answers || []).map((answer, key) => {
                            const resAuthor: IUserInfo =  persons.find(f => f.email === answer.emailUser) as any;
                            return (
                                <ListItem key={key} divider>
                                    <ListItemAvatar >
                                        <Tooltip title={resAuthor.nick || resAuthor.email} arrow>
                                            <Avatar sx={{ width: 26, height: 26 }} src={resAuthor.avatar}></Avatar>
                                        </Tooltip>
                                    </ListItemAvatar>
                                    <ListItemText primary={answer?.date ? format(new Date(answer.date), 'dd/MM/yyyy - HH:mm') : '' } secondary={answer.text}/>

                                </ListItem>
                            )
                        })}
                    </List>
                </CardContent>
            </Collapse>
            
        </Card>
    ) : null

}