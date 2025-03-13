
const express = require("express");
const app = express();
require("./db/db");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(path.join(__dirname, "../public/stylesheets")));
app.use(express.static(path.join(__dirname, "../public/javascripts")));
app.use(express.static(path.join(__dirname, "../public/images")));
app.use(express.static(path.join(__dirname, "../public/Gif")));
app.use(express.static(path.join(__dirname, "../public/Videos")));

app.use('/src', express.static(path.join(__dirname, 'src')));

module.exports = { app };