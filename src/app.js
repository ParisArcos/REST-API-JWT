import express from "express";
import morgan from "morgan";
import pkj from "../package.json";

import { createRoles } from "./libs/initialSetup";

import productsRoutes from "./routes/products.routes";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";

const app = express();
createRoles();

app.set("pkj", pkj);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: app.get("pkj").name,
    author: app.get("pkj").author,
    description: app.get("pkj").description,
    version: app.get("pkj").version,
  });
});

app.use("/api/products", productsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

export default app;
