
import express from "express";
import mongoose from "mongoose";
import {router as userRoutes} from "./routes/user";

const app = express();
app.use(express.json());
app.use("/api", userRoutes);

mongoose.connect(
  <string>process.env.MONGODB_URI
)
.then(() => console.log("connected to mongodb"))
.catch((e: Error) => console.error(e.message));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`To view your app, open this link in your browser: http://localhost:` + port);
});