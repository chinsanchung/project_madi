import express from "express";
import morgan from "morgan";
import cors from "cors";
import Log from "@util/Debug";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "@router/index";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/api", router);

app.listen(5000, () => Log.message("Start server : 5000"));
