require("dotenv").config();

const { app } = require("./app");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("temp_index.ejs");
});

app.use(bodyParser.json());
app.use(cors());

app.use("/auth", AuthRouter);

app.get("/ls", (req, res) => {
    res.render("account.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
