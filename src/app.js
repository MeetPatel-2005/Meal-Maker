
const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/stylesheets")));
app.use(express.static(path.join(__dirname, "../public/javascripts")));
app.use(express.static(path.join(__dirname, "../public/images")));
app.use(express.static(path.join(__dirname, "../public/Gif")));

module.exports = { app };