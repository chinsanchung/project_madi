import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import app from "@src/core/App";
import Log from "@src/utils/logger";
import "@src/core/Database";

const server = express();
let port: number = 0;

server.use(helmet());
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors({ origin: true, credentials: true }));

if (process.env.NODE_ENV === "development") {
  server.use(morgan("dev"));
  port = 5000;
} else {
  server.use(morgan("common"));
  port = 8080;
}

server.use("/", app);

server.listen(port, () => Log.message(`start Server: ${port}`));
