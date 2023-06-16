const Performance = require("../model/performanceSchema");
const FeedBack = require("../model/feedbackSchema");
const asyncHandler = require("express-async-handler");
const express = require("express");
// getFeedback function fetches the feedbcak present on the  perfomance comments and sends it as a response
const getFeedback =asyncHandler( async(req,res) =>{
    const employeeId = req.user.id;
    const performaceId = req.params.performaceId;
    console.log("employee id and performacne id:", employeeId,performaceId )
    if(!employeeId || !performaceId){
        res.status(401);
        // res.send({});
        throw new Error("not authoired or not performance ID")
    }
    const feedbackInfo = await FeedBack.findOne({performanceId: performaceId })
    console.log("FeedbackInfo of the review : ", feedbackInfo);
    res.status(200);
    res.send(feedbackInfo);
})

// Once the user submits the feedback on the review comments this function will validate it and update the DB
const setFeedback = asyncHandler( async (req,res)=>{
    // const reviewFor = req.params.id;
    
    const reviewBy = req.user.id;
    const { feedback,performanceId } = req.body;
    console.log("req user id: ", req.user.id, feedback, performanceId)
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

module.exports = {setFeedback,getFeedback}