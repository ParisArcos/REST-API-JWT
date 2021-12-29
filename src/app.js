import express from "express";
import morgan from "morgan";
import pkj from "../package.json";
import productsRoutes from "./routes/products.routes";

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

app.use("/products", productsRoutes);

export default app;
