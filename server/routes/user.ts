import express from "express";
import {userModel} from "../models/user";

export const router = express.Router();

// create user 
router.post("/users", (req, res) => {
    const user = new userModel(req.body);
    user
        .save()
        .then(r => res.json(r))
        .catch((e: Error) => res.json({messages: e.message}))
});