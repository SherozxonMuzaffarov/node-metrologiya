require('dotenv').config();
const { Sequelize } = require("sequelize");

const initializeDatabase = async () => {
  let sequelize;

  if (process.env.DATABASE_URL) {
    // Production - Heroku
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      define: {
        timestamps: true,
      },
    });
  } else {
    // Development - Local
    const username = process.env.DB_USER;
    const password = process.env.DB_PASS;
    const database = process.env.DB_DATABASE;
    const host = process.env.HOST;
    const dialect = process.env.DB_DIALECT;
    const port = process.env.DB_PORT;

    sequelize = new Sequelize(database, username, password, {
      host,
      port,
      dialect,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  return sequelize;
};

module.exports = initializeDatabase;
