const { Pool } = require("pg");

const dbPool = new Pool({
  database: "my_project",
  port: 5432,
  user: "postgres",
  password: "16010",
});

module.exports = dbPool;
