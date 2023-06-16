const Performance = require("../model/performanceSchema");

// Fetched all the review comments for the logged in user after validating the user's accesstoken
const reviews = async(req,res)=>{
    const employeeId = req.user.id;
    // console.log("Employee id who is requsting reviews:", employeeId)
    if(!employeeId){
        res.status(401);
        throw new Error("User not authorized!");
    }
    const reviewsInfo = await Performance.find({reviewFor: employeeId});
    // console.log("All the reviews of employee from server :", reviewsInfo);
    res.status(200);
    res.send(reviewsInfo);
}


module.exports= {reviews};