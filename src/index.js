require("dotenv").config();

const { app } = require("./app");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.render("temp_index.ejs");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
