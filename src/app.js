const express = require("express");
// initialise server
const server = express();

//connect to mongoDB
require("./model/mongo.js")()

// helping express work with json
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.get("*", (req, res) => {
  res.status(404).send({
    status: "failure",
    message: "This endpoint does not exist.",
    data: {}
  });
});

module.exports = server;
