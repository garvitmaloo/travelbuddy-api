import { Sequelize } from "@sequelize/core";
import { PostgresDialect } from "@sequelize/postgres";
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl:
    process.env.NODE_ENV === "development"
      ? false
      : {
          rejectUnauthorized: false
        },
  pool: {
    min: 1,
    max: 3,
    idle: 10000,
    acquire: 15000
  }
});

export default sequelize;
