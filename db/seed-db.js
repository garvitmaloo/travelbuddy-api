const { Sequelize } = require("@sequelize/core");
const { PostgresDialect } = require("@sequelize/postgres");
const { config } = require("dotenv");

const DUMMY_DATA = require("./dummy-data.json");

config({ path: "../.env.local" });

const { DB_USER, DB_PORT, DB_PASSWORD, DB_NAME } = process.env;

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  url: `postgres://${DB_USER}:${DB_PASSWORD}@localhost:${DB_PORT}/${DB_NAME}`
});

const initiateSeeding = async function () {
  try {
    await sequelize.authenticate();

    // Create table
    await sequelize.query(
      "CREATE TABLE IF NOT EXISTS travel_destinations (id SERIAL PRIMARY KEY, name VARCHAR(100) UNIQUE, description VARCHAR(255), image_url VARCHAR(255))"
    );

    // Insert data in the table
    for (const item of DUMMY_DATA) {
      await sequelize.query(
        "INSERT INTO travel_destinations (name, description, image_url) VALUES (:name, :description, :image_url) ON CONFLICT (name) DO NOTHING",
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
    console.error("Something went wrong while seeding the DB.");
  }
};

initiateSeeding();
