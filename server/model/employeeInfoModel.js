const mongoose = require("mongoose");

const employeeSchema =  mongoose.Schema({
    firstName:{
        type:String,
        require: true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    joiningDate:{
        type:Date,
        default: Date.now 
    },
    department:{
        type:String,
        enum: ["HR", "Sales", "Production","Marketing","IT"],
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    performanceList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Performance",
        },
      ],
    FeedbackList: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Feedback",
        },
      ],
    

},
{
    timestamp:true
})


module.exports = mongoose.model("Employee", employeeSchema);