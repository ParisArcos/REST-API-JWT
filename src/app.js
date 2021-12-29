import express from "express";
import morgan from "morgan";
import pkj from "../package.json";

const app = express();

app.set("pkj", pkj);

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkj").name,
    author: app.get("pkj").author,
    description: app.get("pkj").description,
    version: app.get("pkj").version,
  });
});

export default app;
