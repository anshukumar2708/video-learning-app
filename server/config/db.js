const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL;


const ConnectDb = async () => {
    try {
        await mongoose.connect(MONGO_URL)
        console.log("Database connected Successfully");
        return true;
    } catch (err) {
        console.log("Database connection error", err);
    }
}


module.exports = ConnectDb;