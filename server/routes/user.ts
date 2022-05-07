import express from "express";
import {userModel} from "../models/user";
import passport from 'passport';

export const router = express.Router();

const PATH = "/users";

router.post(`${PATH}/signup`, passport.authenticate('local-signup', {session: false}),
(req: any, res, next) => {
    res.json(req.user);
});

router.post(`${PATH}/login`, passport.authenticate('local-login', {session: false}),
(req: any, res, next) => {
    console.log(req);
    res.json(req.user);
});

// create user
router.post(`${PATH}`, (req, res) => {
    const user = new userModel(req.body);
    user
        .save()
        .then(r => res.json(r))
        .catch((e: Error) => res.json({messages: e.message}));
});

router.get(PATH, (req, res) => {
    userModel
        .find()
        .then(r => res.json(r))
        .catch((e: Error) => res.json({messages: e.message}));
});

// Auth
router.post('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});