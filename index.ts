import express from "express";
import "dotenv/config";
import { getDBConnection } from "./src/config/dbConnection";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

getDBConnection();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
