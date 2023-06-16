const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require('cors')
const {errorHandler} = require("./middleware/errorHandler")
const dotenv = require("dotenv").config();


const app = express();
// to parse the data which we get from client
app.use(express.json());

app.use(cors());
app.use(errorHandler);

connectDb();

const port = process.env.PORT || 5001;

app.use("/", require(
    "./routes/EmployeeReviewSystemRoutes"
));


app.listen(port, ()=>{
    console.log("Server running on port: ", port);
    console.log(port);
});