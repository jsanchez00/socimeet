import express from 'express';
import { IPublication, IPublicationAnswer, IPublicationLike, IPublicationExtended } from '../../client/src/interfaces/publication';
import { IUserInfo } from '../../client/src/interfaces/user';
import { publicationAnswerModel, publicationLikeModel, publicationModel } from '../models/publication';
import { getFriends } from './relatonship';
import { clone } from 'ramda';
import { Guid } from 'guid-typescript';

export const router = express.Router();

const PATH = '/publications';

router.post(`${PATH}/get-friends-publications`, (req, res) => {
  const userEmail = req.body.email;
  getFriends(req.body.email).then((friends: IUserInfo[]) => {
    const friendEmails: string[] = friends.map((f) => f.email);
    const emails = [].concat(friendEmails).concat([userEmail]);
    publicationModel
      .find({
        emailUser: { $in: emails },
      })
      .sort('+date')
      .then(async (r: IPublication[]) => {
        const ids = r.map((p) => p.id);
        console.log(ids);
        const foundAnswers: IPublicationAnswer[] = await publicationAnswerModel.find({
          publicationId: { $in: ids },
        });
        const foundLikes: IPublicationLike[] = await publicationLikeModel.find({
          publicationId: { $in: ids },
        });
        let publicationsExtended: Partial<IPublicationExtended>[] = [];
        r.forEach((p) => {
          const currentAnswers = foundAnswers.filter((a) => a.publicationId === p.id);
          const currentLikes = foundLikes.filter((a) => a.publicationId === p.id);
          let currentP: IPublicationExtended = {
            answers: currentAnswers,
            likes: currentLikes,
            date: p.date,
            emailUser: p.emailUser,
            text: p.text,
            title: p.title,
            id: p.id,
            image: p.image,
          };
          publicationsExtended.push(currentP);
        });


        res.json(publicationsExtended);
      });
  });
});

router.post(`${PATH}/create`, (req, res) => {
  const publication: IPublication = {
    ...req.body,
    date: new Date(),
    id: Guid.create().toString(),
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
    .then((r) => res.json(like))
    .catch((e) => res.json({ message: 'Error al reaccionar' }));
});
