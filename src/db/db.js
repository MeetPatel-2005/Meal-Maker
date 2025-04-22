require('dotenv').config();
const mongoose = require("mongoose");

// const mongo_url = process.env.MONGO_CONN;
const mongo_url = "mongodb+srv://meetkpatel10725:Meetkpatel2005@cluster0.pdrhf.mongodb.net/auth-db?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongo_url)
    .then(() => {
        console.log("MongoDB Connected...");
    }).catch((err) => {
        console.log("MongoDB Connection Error: ",err);
    });