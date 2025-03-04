import express from "express";
import "dotenv/config";
import { getDBConnection } from "./src/config/dbConnection";
import routes from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import swaggerOptions from "./src/config/swaggerConfig";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(cors());
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// swagger
// const swaggerDocs = swaggerJsDocs(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));

routes(app);
getDBConnection();


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
