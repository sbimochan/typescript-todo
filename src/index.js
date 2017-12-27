"use strict";
exports.__esModule = true;
var cors = require("cors");
var express = require("express");
var routes_1 = require("./routes");
var app = express();
app.use(cors());
// API Routes
app.use('/', routes_1["default"]);
