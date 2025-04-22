
const path = require("path");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");
const { signup, login } = require("../controllers/AuthController");
const { forget_password, reset_password } = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);

router.post("/forget-password", forget_password);
router.post("/reset-password", reset_password);

router.get("/reset-password", (req, res) => {
    res.render("reset", { token: req.query.token });
});

module.exports = router;

