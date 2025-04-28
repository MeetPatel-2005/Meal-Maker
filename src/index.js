
require("dotenv").config();

const { app }  = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());  // Parses JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data
app.use(cors());

app.get("/", (req, res) => {
    res.render("account.ejs");
});

app.use("/auth", AuthRouter);

app.get("/home", (req, res) => {
    res.render("temp_index.ejs");
});

app.get("/ls", (req, res) => {
    res.render("account.ejs");
});

app.get("/forget-password", (req, res) => {
    res.render("forget-reset.ejs");
});

app.get("/reset-password", (req, res) => {
    res.render("reset.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
