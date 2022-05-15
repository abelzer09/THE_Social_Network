require("dotenv").config();
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once("open", () => {
  server.listen(PORT, () => {
    console.log(`Server and API are running on ${PORT}`);
  });
});