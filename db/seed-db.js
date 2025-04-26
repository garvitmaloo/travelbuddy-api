const { Sequelize } = require("sequelize");
const { config } = require("dotenv");

const DUMMY_DATA = require("./dummy-data.json");

config({ path: "../.env.local" });

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

const initiateSeeding = async function () {
  try {
    await sequelize.authenticate();

    // Create table
    await sequelize.query(
      "CREATE TABLE IF NOT EXISTS travel_destinations (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) UNIQUE, description VARCHAR(255), image_url VARCHAR(255))"
    );

    // Insert data in the table
    for (const item of DUMMY_DATA) {
      await sequelize.query(
        "INSERT INTO travel_destinations (name, description, image_url) VALUES (:name, :description, :image_url)",
        {
          replacements: {
            name: item.name,
            description: item.description,
            image_url: item.image_url
          }
        }
      );
    }

    console.log("Database seeded.");
    await sequelize.close();
  } catch (err) {
    console.error("Something went wrong while seeding the DB.", err);
  }
};

initiateSeeding();
