"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var SecretController_1 = require("./src/presentation/SecretController");
var data = require("./config.json");
var app = express();
app.use(express.json());
var secretController = new SecretController_1.SecretController();
app.post("/api/secrets", secretController.createSecret.bind(secretController));
app.get("/api/secret/:secretKey", secretController.getSecret.bind(secretController));
app.listen(data.portNumber, function () {
    console.log("Listening http://localhost:".concat(data.portNumber));
});
exports.default = app;
