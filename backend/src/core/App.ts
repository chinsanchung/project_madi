import express from "express";
import path from "path";
import routers from "@src/routers";

const app = express.Router();

app.use("/api", routers);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../dist")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../../dist/index.html"))
  );
}

export default app;
