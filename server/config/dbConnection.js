const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// Database connection establishment
const connectDb = async () =>{
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connected : ",connect.connection.host, connect.connection.name);
    }
    catch(err){
        console.log("Error in connecting to DB: ", err);
    }
    
}

module.exports= connectDb;