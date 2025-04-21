const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

const sendresetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Use environment variables
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Reset Your Password",
            html: `<p>Hi ${name},</p>
                   <p>Click the link below to reset your password:</p>
                   <a href="http://127.0.0.1:3000/auth/reset-password?token=${token}">
                   Reset Password</a>`
        };

        await transporter.sendMail(mailOptions);
        console.log("Reset password email sent");

    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const securePassword = async(password) => {
    try
    {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    }
    catch(error)
    {
        res.status(400).send(error.message);
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if(user)
        {
            return res.status(409)
                .json({message: "User is already exist, you can't login", success: false});
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await securePassword(password);
        await userModel.save();
        res.status(201)
            .json({
                message: "signup successfully",
                success: true
            })
    }catch(err) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = "Auth failed email or password is wrong";

        if(!user)
        {
            return res.status(403)
                .json({message: errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if(!isPassEqual)
        {
            return res.status(403)
                .json({message: errorMsg, success: false});
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        )
        
        res.status(200)
            .json({
                message: "login success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    }catch(err) {
        res.status(500)
            .json({
                message: "internal server error",
                success: false
            })
    }
}

const forget_password = async (req, res) => {
    try {
        let { email } = req.body;
        
        if (!email) {
            return res.status(400).send({ success: false, msg: "Email is required" });
        }

        email = email.toLowerCase(); // ✅ Convert to lowercase before searching
        console.log("Searching for email:", email); // Debugging

        const userData = await UserModel.findOne({ email });

        if (!userData) {
            return res.status(404).send({ success: false, msg: "This email does not exist." });
        }

        // ✅ Generate a secure token for reset
        const resetToken = randomstring.generate();
        await UserModel.updateOne({ email }, { $set: { token: resetToken } });
        // console.log("Generated Token : ",resetToken);

        // ✅ Send reset email
        await sendresetPasswordMail(userData.name, userData.email, resetToken);

        return res.status(200).send({ success: true, msg: "Check your email to reset your password." });

    } catch (error) {
        console.error("Error in forget_password:", error);
        return res.status(500).send({ success: false, msg: "Internal server error." });
    }
};

const reset_password = async (req, res) => {
    try {
        const { token } = req.body;  // Get token from URL
        const { password } = req.body  // Get new password from request body

        // console.log("Received token:", token);  // Debugging
        // console.log("Received new password:", password);

        if (!token) {
            console.error("Token is missing in the request.");
            return res.status(400).json({ success: false, msg: "Token is required." });
        }

        // Find user with the token in the database
        const userData = await UserModel.findOne({ token: token });

        if (!userData) {
            console.error("Token not found or expired.");
            return res.status(400).json({ success: false, msg: "Invalid or expired token." });
        }

        console.log("User found:", userData.email);

        // Hash the new password
        const newPassword = await bcrypt.hash(password, 10);
        // console.log("New hashed password:", newPassword);

        // Update user's password and remove token
        await UserModel.updateOne(
            { _id: userData._id },
            { $set: { password: newPassword, token: "" } }
        );

        // console.log("Password reset successful for:", userData.email);

        return res.status(200).json({ 
            success: true, 
            msg: "Password reset successfully.", 
            redirectUrl: "/ls"  // Redirect URL to account page
        });

    } catch (error) {
        console.error("Error in reset password:", error.message);
        return res.status(500).json({ success: false, msg: "Internal server error." });
    }
};

module.exports = {
    signup,
    login,
    forget_password,
    reset_password
}