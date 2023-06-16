const express = require("express");
const asyncHandler = require("express-async-handler");
const Employee = require("../model/employeeInfoModel");
const FeedBack = require("../model/feedbackSchema");
const Performance = require("../model/performanceSchema");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const { errorHandler } = require("../middleware/errorHandler");


// Validate the paramters and register the user as an employee
const register = asyncHandler(async (req,res)=>{
    // console.log("From register : ",req.body);
    const {firstName,lastName,department,email,password,confirmPassword} = req.body;
    if(!firstName || !department  || !email || !password || !confirmPassword ){
        res.status(400);
        // throw new Error("All fileds are mandatory!!");
        res.send("All fields are mandatory");
    }
    const emailExists = await Employee.findOne({email});
    // console.log(emailExists);
    if(emailExists){
        res.status(400);
        res.send("Email already exists");    
    }
    else if( confirmPassword != password){
        res.status(400);
        res.send("Confirm password doesnot match!");     
    }
    else{
        const hashedPassword = await bcrypt.hash(password,10);
        const userInfo = await Employee.create({
            firstName,lastName,department,email,password:hashedPassword
        })
        if(userInfo){
            res.status(200);
            const accessToken = jwt.sign({
                user:{
                    name:userInfo.firstName,
                    email: userInfo.email,
                    _id: userInfo._id
                }
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"20m"}
            )
            res.send(accessToken);
        }
        else{
            res.status(400);
            throw new Error("Error while registering employee!");
           
        }
    }

});
// Validate the user and credentials and generate the accessToken
const login = asyncHandler( async(req,res)=>{
    const {email,employeeType,password} = req.body;
    console.log("employeeType: ",employeeType);
    if(!email || !password || !employeeType){
        res.status(400);
        throw new Error("All fileds are madatory!");
    }
    else{
        const userInfo = await Employee.findOne({email}); 
        // console.log("UserInfo after finding user by email: " ,userInfo);
        // console.log("bcrypt compare", await  bcrypt.compare(userInfo.password, password));
        if( userInfo && await bcrypt.compare(password,userInfo.password) ){
            if(employeeType ==="Admin" && !userInfo.isAdmin){
                res.status(401);
                throw new Error ( "Not authorized!");
            }
            // else{
            const accessToken = jwt.sign({
                user:{
                    name: userInfo.name,
                    email: userInfo.email,
                    password:userInfo.password,
                    id: userInfo._id
                }
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"20m"}
            );
            res.status(200);
            res.send({accessToken: accessToken,employeeId : userInfo._id});
            // }
            
        }
        
        else{
            res.status(400);
            throw new Error ( "Email or password is invalid")
        }
    }
});

// Employeee can provide the feedback for the review received, validate the perfomace commnet ID and update the feedback
const feedback = asyncHandler( async (req,res)=>{
    // const reviewFor = req.params.id;
    console.log("req user id: ", req.user.id)
    const reviewBy = req.user.id;
    const { feedback,performanceId } = req.body;
    if(!feedback || !reviewBy || !performanceId ){
        res.status(400);
        throw new Error("All fileds are mandatory!!");
    }
    const feedbackInfo = await FeedBack.create({
        feedback,performanceId
    });
    const feedBackId = feedbackInfo._id;
    if(feedbackInfo){
        console.log("Feedback is created and id: ", feedbackInfo._id);
        await Performance.updateOne(
            { "_id" : performanceId },
            { $set: { "feedBackId" : feedBackId} }
         );
        res.status(200);
        res.send(feedbackInfo);
    }
    else{
        res.status(400);
        throw new Error("Error while updating performance information");
    }
});

// Once the accesstoken is validated logged in user f=informaction is fetched from the DB and responded back to the client
const emplooyeeDetails = asyncHandler( async (req,res)=>{
    const employeeId = req.user.id;
    console.log("req params id and id from token:  ", employeeId, req.user._id);
    if(!employeeId ){
        res.status(400);
        throw new Error("All fileds are mandatory!!");
    }
    const emplooyeeInfo = await Employee.findOne({
       _id: employeeId
    });
   
    if(emplooyeeInfo){
        console.log("Feedback is created and id: ", emplooyeeInfo.firstName);
        res.status(200);
        res.send(emplooyeeInfo);
    }
    else{
        res.status(400);
        throw new Error("Error while fetching the details of employee");
    }
});


module.exports = {register,login, feedback,emplooyeeDetails};