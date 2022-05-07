
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { router as userRoutes } from "./routes/user";
import "./passport/local-auth";

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

// Serve the React static files after build
app.use(express.static("client/build"));
app.use("/api", userRoutes);
app.use(cors);

mongoose.connect(
  process.env.MONGODB_URI as string
)
.then(() => console.log("connected to mongodb"))
.catch((e: Error) => console.error(e.message));

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

app.get("/api/hello", (req, res) => {
  res.send({ message: "Hello" });
});

// All other unmatched requests will return the React app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build",  "index.html"));
});