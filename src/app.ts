import express from "express";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import bodyParser from "body-parser";
import morgan from "morgan";
import type { Request, Response, NextFunction } from "express";

import { logger } from "./utils/logger";
import { handleErrors } from "./middleware/handleErrors";
import sequelize from "./config/db";
import { destinationRoutes } from "./routes";

const app = express();
config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(morgan("tiny"));

const port = process.env.PORT ?? 9000;

// APP ROUTES
app.get("/", (req, res) => {
  return res.send("You are at home page...");
});

app.use("/api/destinations", destinationRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  handleErrors(error, req, res, next);
});

sequelize
  .authenticate()
  .then(() => {
    app.listen(port, () => {
      logger.info(`Connected to DB and server started on port ${port}`);
    });
  })
  .catch((err) => {
    logger.error(`Error while connecting to DB - ${err}`);
  });
