import express from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./database/database.js";

const app = express();

const corsOption = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true, // allow the Access-Control-Allow-Credentials
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOption));
app.use(morgan("tiny"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

connectDB()
  .then(() => {
    console.log("init!");
    const server = app.listen(config.host.port);
    initSocket(server);
  })
  .catch(console.error);
