import mongoose from "mongoose";
import Log from "@src/utils/logger";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
const handleOpen = () => Log.message("Connected to MongoDB");
const handleError = (error: Error) => Log.message("MongoDB Error: ", error);

db.once("open", handleOpen);
db.on("error", handleError);
