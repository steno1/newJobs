import mongoose from "mongoose"

const JobSchema=new mongoose.Schema({


    company:{
        type:String,
         required:[true, "please provide company"],
 maxlength:60
 },


 position:{
    type:String, 
    required:[true, "please provide position"],
maxlength:150
},

status:{
    type:String, 
    enum: ["Interview", "Declined", "Pending"],
    default:"Pending",
},


jobType:{
    type:String, 
    enum: ["Full-time", "Part-time", "Remote", "Internship"],
    default:"Remote",
},

jobLocation:{
    type:String, 
    default:"My city",
    required:true,  
},
createdBy:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:[true, "Please provide user"]
}


}, {timestamps:true}
)

export default mongoose.model("Job", JobSchema)
