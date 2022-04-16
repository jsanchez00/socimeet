import express from "express";
import {userModel} from "../models/user";

export const router = express.Router();

const PATH = "/users";

// create user
router.post(PATH, (req, res) => {
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