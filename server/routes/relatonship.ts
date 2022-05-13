import express from 'express';
import { relationShipModel } from '../models/relationship';
import { userModel } from '../models/user';

export const router = express.Router();

const PATH = '/relationships';

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
