import express from 'express';
import { IPublication, IPublicationAnswer, IPublicationLike } from '../../client/src/interfaces/publication';
import { IUserInfo } from '../../client/src/interfaces/user';
import { publicationAnswerModel, publicationLikeModel, publicationModel } from '../models/publication';
import { getFriends } from './relatonship';

export const router = express.Router();

const PATH = '/publications';

router.post(`${PATH}/get-friends-publication`, (req, res) => {
  getFriends(req.body.email).then((friends: IUserInfo[]) => {
    const friendEmails: string[] = friends.map((f) => f.email);
    publicationModel
      .find({
        emailUser: { $in: [].concat(friendEmails).concat([req.body.email]) },
      })
      .sort('+date')
      .then(res.json);
  });
});

router.post(`${PATH}/create`, (req, res) => {
  const publication: IPublication = {
    ...req.body,
    date: new Date(),
  };
  publicationModel.create(publication).then((r) => res.json(publication));
});

router.post(`${PATH}/answer-publication`, (req, res) => {
  const answer: IPublicationAnswer = {
    ...req.body,
    date: new Date(),
  };
  publicationAnswerModel
    .create(answer)
    .then((r) => res.json(answer))
    .catch((e) => res.json({ message: 'Error al enviar el comentari' }));
});

router.post(`${PATH}/like-publication`, (req, res) => {
  const like: IPublicationLike = {
    ...req.body,
    date: new Date(),
  };
  publicationLikeModel
    .create(like)
    .then(res.json)
    .catch((e) => res.json({ message: 'Error al reaccionar' }));
});
