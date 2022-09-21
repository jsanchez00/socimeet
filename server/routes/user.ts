import path2 from "path";
import express from "express";
import { userModel } from "../models/user";
import passport from "passport";
import multer from "multer";
import { Guid } from "guid-typescript";
import { promisify } from "util";
import fs from "fs";
import { without } from "ramda";

const DIR = "./static/assets/avatars/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, `${Guid.create().toString()}-${fileName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 8388608 }, // 8mb
  // limits: { fileSize: 2097152 }, // 2mb
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log("Only .png, .jpg and .jpeg format allowed!");
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

// --------------------------

export const router = express.Router();

const PATH = "/users";

router.post(
  `${PATH}/signup`,
  passport.authenticate("local-signup", { session: false }),
  (req: any, res, next) => {
    res.json(req.user);
  }
);

router.post(
  `${PATH}/login`,
  passport.authenticate("local-login", { session: false }),
  (req: any, res, next) => {
    res.json(req.user);
  }
);

router.get(`${PATH}/:email`, (req, res) => {
  const params = req.params;
  const email = params.email;
  userModel
    .findOne({
      email,
    })
    .then((r) => res.json(r))
    .catch((e: Error) => res.json({ messages: e.message }));
});

router.post(`${PATH}/update-user`, (req, res) => {
  userModel
    .updateOne({ email: req.body.email }, without(["avatar"], req.body))
    .then((r) => res.json(r))
    .catch((e: Error) => res.json({ messages: e.message }));
});

router.post(
  `${PATH}/update-avatar`,
  upload.single("profileImg"),
  async (req: any, res) => {
    const userInfo = await userModel.findOne({ email: req.body.email });
    if (userInfo.avatar) {
      try {
        let p = __dirname + "\\..\\..";
        if (process.env.C_ENV === "P") p = __dirname + "//..";
        fs.realpath(p, (err, pathResolved: string) => {
          if (err) {
            console.log(err);
          } else {
            if (process.env.C_ENV === "P")
              fs.unlinkSync(`${pathResolved}/static${userInfo.avatar}`);
            else
              fs.unlinkSync(
                `${pathResolved}\\static${userInfo.avatar
                  .split("/")
                  .join("\\")}`
              );
          }
        });
      } catch (e) {
        console.error(e);
      }
    }
    const path = `/assets/avatars/${req.file.filename}`;
    userModel
      .updateOne(
        {
          email: req.body.email,
        },
        {
          avatar: path,
        }
      )
      .then((r) => {
        res.json({
          avatar: path,
        });
      });
  }
);
