const asyncHandler = require("express-async-handler");
const Employee =require("../model/employeeInfoModel");
const Performance = require("../model/performanceSchema");

const bcrypt = require("bcrypt");
// const ObjectId = require('mongodb').ObjectId; 

//  Fetch the req user after token validation and update the user passed as parameter and make them as Admin
const makeAdmin = asyncHandler( async (req,res)=>{
   const adminId = req.user.id; /// what is differnce between this and  .findOne({id}) ?? 
   const {employeeId} = req.body;
   if(!adminId){
    res.status(400);
    throw new Error("User not authorized!");
   }
  
   console.log("Make admin controller function",adminId);
   const adminInfo = await Employee.findOne({_id: adminId});
//    if the current user is not an admin restrict the user to make this action
   if(!adminInfo.isAdmin){
        res.status(400);
        throw new Error("User not authorized!");
   }
//    Find and update the user
   const updatedInfo = await Employee.findOneAndUpdate( { _id: employeeId }, { $set: { isAdmin: true } } );
    if(updatedInfo){
        const emplooyeeInfo = await Employee.findOne({
             _id: employeeId 
         })
        
        if(await emplooyeeInfo){
            //  console.log("Feedback is created and id: ", emplooyeeInfo.firstName);
             res.status(200);
             res.send(emplooyeeInfo);
         }
    }
   
// console.log(updatedInfo)
else{
    res.status(500);
    throw new Error("Internal server error while updating user");
}
   
})

// When the user is Admin allow the user to make the action else restrict
const allEmployeeDetails = async (req,res)=>{
    const isAdmin = req.user; /// what is differnce between this and  .findOne({id}) ?? 
    // console.log("ID from params Whether the user is admin ?",isAdmin);
    if(!isAdmin){
        res.status(401);
        throw new Error("User not authorized!");
    }
    const employeesInfo = await Employee.find({});
    res.status(200);
    res.json(employeesInfo);
 }
// Add performace comments for an employee validate all the fileds and update the information in DB
const performaceComments = asyncHandler( async (req,res)=>{
    // const reviewFor = req.params.id;
    // console.log("re.user:" ,req.user.id)
    const reviewBy = req.user.id;
    const reviewComments = req.body;
    const { reviewFor, overallPerformance,scopeOfImprovement,rating } = req.body;
    console.log("review BY : ", reviewFor,overallPerformance , scopeOfImprovement, rating, req.body);
    if(!reviewFor || !overallPerformance || !scopeOfImprovement || !rating || !reviewBy  ){
        res.status(400);
        throw new Error("All fileds are mandatory!!");
    }
    const performanceInfo = await Performance.create({
        reviewFor,reviewBy,overallPerformance,scopeOfImprovement,rating
    });
    if(performanceInfo){
        res.status(200);
        res.send(performanceInfo);
    }
    else{
        res.status(500);
        throw new Error("Error while updating performance information");
    }
});

// If the current user is admin then this fucntion will find the delete the user from the DB
const deleteEmployee = asyncHandler( async (req,res)=>{
    const adminId = req.user.id; /// what is differnce between this and  .findOne({id}) ?? 
    const {employeeId} = req.body;
    if(!adminId){
     res.status(400);
     throw new Error("User not authorized!");
    }
   
    console.log("Make admin controller function",adminId);
    const adminInfo = await Employee.findOne({_id: adminId});
    if(!adminInfo.isAdmin){
         res.status(400);
         throw new Error("User not authorized!");
    }
 //    console.log(userInfo)
    const deletedInfo = await Employee.findOneAndDelete( { _id: employeeId }  );
     if(deletedInfo){
        //  console.log("Feedback is created and id: ", emplooyeeInfo.firstName);
        res.status(200);
        res.send(deletedInfo); 
     }
 // console.log(updatedInfo)
 else{
     res.status(500);
     throw new Error("Internal server error while deleting user");
 }
});

module.exports = {makeAdmin, performaceComments,allEmployeeDetails,deleteEmployee};   