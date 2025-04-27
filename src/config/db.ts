import { Sequelize } from "sequelize";
import { config } from "dotenv";

config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
if (
  DB_HOST === undefined ||
  DB_NAME === undefined ||
  DB_USER === undefined ||
  DB_PASSWORD === undefined
) {
  throw new Error("Missing environment variables");
}

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql"
});

export default sequelize;
