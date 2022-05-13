import express from 'express';
import { userModel } from '../models/user';
import passport from 'passport';

export const router = express.Router();

const PATH = '/users';

router.post(`${PATH}/signup`, passport.authenticate('local-signup', { session: false }), (req: any, res, next) => {
  res.json(req.user);
});

router.post(`${PATH}/login`, passport.authenticate('local-login', { session: false }), (req: any, res, next) => {
  res.json(req.user);
});

router.get(`${PATH}/:email`, (req, res) => {
  const params = req.params;
  const email = params.email;
  userModel
    .find({
      email,
    })
    .then((r) => res.json(r))
    .catch((e: Error) => res.json({ messages: e.message }));
});

router.post(`${PATH}/update-user`, (req, res) => {
  userModel
    .updateOne({ email: req.body.email }, req.body)
    .then((r) => res.json(r))
    .catch((e: Error) => res.json({ messages: e.message }));
});
