require("dotenv").config();
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(routes);

db.once("open", () => {
  server.listen(PORT, () => {
    console.log(`Server and API are running on ${PORT}`);
  });
});