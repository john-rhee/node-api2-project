const express = require("express");

const theRouter = require("../router/theRouter.js")

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
    res.send(
        `<h1>Welcome to today's project!</h1>`
    );
});

server.use("/api/posts", theRouter);

module.exports = server;