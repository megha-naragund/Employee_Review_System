const mongoose = require("mongoose");

const performanceSchema = mongoose.Schema({
    reviewBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required : true
    },
    reviewFor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required : true
    },
    overallPerformance:{
        type:String,
        required : true
    },
    scopeOfImprovement:{
        type:String,
        required : true
    },
    
    rating:{
        type: Number,
        min: [1, "minimum ranking 1 is lowest"],
        max: [5, "higest ranking is 5"],
    },
    feedBackId:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"Feedback"
    },
    
},{
    timestamp:true
})


module.exports = mongoose.model("Performance",performanceSchema);