import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/ApiRestJWT-DB")
  .then((db) => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));
