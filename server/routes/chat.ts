import express from 'express';
import { chatMessageModel } from '../models/chat';
import { relationShipModel } from '../models/relationship';
import { getFriends } from './relatonship';
import { IUserInfo } from '../../client/src/interfaces/user';
import { IMessage, IMessageSummary } from '../../client/src/interfaces/message';

export const router = express.Router();

const PATH = '/chat';

router.post(`${PATH}/get-list`, (req, res) => {
  getFriends(req.body.email).then((friends: IUserInfo[]) => {
    chatMessageModel.find({ $or: [{ receiver: req.body.email }, { transmitter: req.body.email }] }).then((messages: IMessage[]) => {
      const messageSummary: IMessageSummary[] = [];
      friends.forEach((f) => {
        if (messages.findIndex((m) => m.receiver === f.email || m.transmitter === f.email) !== -1) {
          messageSummary.push({
            receiver: f.email,
            transmitter: req.body.email,
          });
        }
      });
      return res.send(messageSummary);
    });
  });
});

router.post(`${PATH}/get-detail`, (req, res) => {
  chatMessageModel
    .find({
      $and: [
        {
          $or: [{ receiver: req.body.firstUser }, { transmitter: req.body.firstUser }],
        },
        {
          $or: [{ receiver: req.body.secondUser }, { transmitter: req.body.secondUser }],
        },
      ],
    })
    .sort('+date')
    .limit(50)
    .then((r) => res.json(r));
});

router.post(`${PATH}/send-message`, (req, res) => {
  const newMessage: IMessage = {
    ...req.body,
    date: new Date(),
  };
  chatMessageModel
    .create(newMessage)
    .then((r) => res.json(newMessage))
    .catch((e) => res.json({ message: 'Error al enviar el missatge' }));
});
