const mongoose = require("mongoose");

const feedbackSchema = mongoose.Schema({
    feedback:{
        type:String,
        required : true
    },
    performanceId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Performance"
    }
},{
    timestamp:true
})


module.exports = mongoose.model("Feedback",feedbackSchema);