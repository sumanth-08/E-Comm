import express from "express";
import "dotenv/config";
import { getDBConnection } from "./src/config/dbConnection";
import routes from "./routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
routes(app);
getDBConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
