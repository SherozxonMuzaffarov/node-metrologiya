require('dotenv').config();

module.exports = {
  dialect: process.env.DB_DIALECT,
  host: process.env.HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  define: {
    timestamps: true
  },
};

