import express from "express";
import mongoose from "mongoose";
import path from "path";
import "./passport/local-auth";
import { router as relationshipRoutes } from "./routes/relatonship";
import { router as userRoutes } from "./routes/user";
import { router as chatRoutes } from "./routes/chat";
import { router as publicationpRoutes } from "./routes/publication";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use("/api", userRoutes);
app.use("/api", relationshipRoutes);
app.use("/api", publicationpRoutes);
app.use("/api", chatRoutes);
const MONGODB_URI = `mongodb://0.0.0.0:27017/socimeet`;

/* if (process.env.C_ENV === 'P') {
  const mongoPassword = '12345';
  const config = JSON.parse(process.env.APP_CONFIG);
  MONGODB_URI = 'mongodb://' + config.mongo.user + ':' + encodeURIComponent(mongoPassword) + '@' + config.mongo.hostString;
} */

console.log(MONGODB_URI);

mongoose
  .connect(MONGODB_URI as string)
  .then(() => console.log(`connected to mongodb ${MONGODB_URI}`))
  .catch((e: Error) => console.error(e.message));

// Serve the static files from the React app

app.use(express.static("static"));
app.use(express.static(path.join(__dirname, "client/build")));

// All other unmatched requests will return the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
