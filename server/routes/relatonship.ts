import express from 'express';
import { relationShipModel } from '../models/relationship';
import { userModel } from '../models/user';

export const router = express.Router();

const PATH = '/relationships';

router.post(`${PATH}/get-requests`, (req, res) => {
  relationShipModel
    .find({
      destination: req.body.email,
      status: 'pending',
    })
    .then((r) => res.json(r));
});

router.post(`${PATH}/accept`, (req, res) => {
  relationShipModel
    .updateOne(
      {
        destination: req.body.destination,
        origin: req.body.origin,
        status: 'pending',
      },
      {
        status: 'done',
      }
    )
    .then((r) => res.json({ message: 'Sol·licitud acceptada correctament' }))
    .catch((e) => res.json({ message: 'Error al acceptar la sol·licitud' }));
});

router.post(`${PATH}/decline`, (req, res) => {
  relationShipModel
    .updateOne(
      {
        destination: req.body.destination,
        origin: req.body.origin,
        status: 'pending',
      },
      {
        status: 'rejected',
      }
    )
    .then((r) => res.json({ message: 'Petició declinada correctament' }))
    .catch((e) => res.json({ message: 'Error al declinar la petició' }));
});

router.post(`${PATH}/send-request`, (req, res) => {
  relationShipModel
    .findOne({
      origin: req.body.origin,
      destination: req.body.destination,
    })
    .then((existRelationShip) => {
      if (!existRelationShip) {
        userModel.findOne({ email: req.body.destination }).then((existDestination) => {
          if (existDestination) {
            relationShipModel
              .create(req.body)
              .then((r) => res.json(r))
              .catch((e: Error) => res.json({ messages: e.message }));
          } else res.sendStatus(500);
        });
      } else {
        res.sendStatus(500);
      }
    });
});

router.post(`${PATH}/remove-friend`, (req, res) => {
  relationShipModel
    .deleteOne({
      $and: [
        {
          $or: [{ destination: req.body.email }, { origin: req.body.email }],
        },
        {
          $or: [{ destination: req.body.friendEmail }, { origin: req.body.friendEmail }],
        },
        {
          status: 'done',
        },
      ],
    })
    .then((r) => res.send(r));
});

router.post(`${PATH}/get-friends`, (req, res) => {
  /* relationShipModel
    .find({
      status: 'done',
      $or: [{ destination: req.body.email }, { origin: req.body.email }],
    })
    .then((r) => {
      const emails = r.map((i) => {
        if (i.destination === req.body.email) return i.origin;
        if (i.origin === req.body.email) return i.destination;
      });
      userModel
        .where('email')
        .in(emails)
        .select('name email nick surname avatar description')
        .then((friends) => {
          res.send(friends);
        });
    }); */
  getFriends(req.body.email).then((r) => {
    console.log(r);
    res.send(r);
  });
});

export const getFriends = (email: string): Promise<any> => {
  return relationShipModel
    .find({
      status: 'done',
      $or: [{ destination: email }, { origin: email }],
    })
    .then((r) => {
      const emails = r.map((i) => {
        if (i.destination === email) return i.origin;
        if (i.origin === email) return i.destination;
      });
      return userModel
        .where('email')
        .in(emails)
        .select('name email nick surname avatar description')
        .then((friends) => {
          return friends;
        });
    });
};
