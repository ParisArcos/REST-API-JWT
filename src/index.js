import app from "./app";
import "./db/database";
import "./config/config";
import { PORT } from "./config/config";

app.listen(PORT);
console.log("Server listen on port", PORT);
