import Job from "../models/job.js";
import {StatusCodes} from "http-status-codes"
import {BadRequestError, NotFoundError, UnAuthenticatedError} from "../errors/index.js";
import checkPermission from "../utils/checkPermission.js";
import mongoose from "mongoose";
import moment from "moment"


  //create job 
const createJob= async(req, res)=>{
const {position, company}=req.body;

if(!position || !company){
  throw new BadRequestError("Please provide all values")
}
req.body.createdBy=req.user.userId;
const job=await Job.create(req.body);
res.status(StatusCodes.CREATED).json({job})
}
//getAllJob
const getAllJob = async (req, res)=>{
  const { search, status, jobType, sort}=req.query

  const queryObject={
    createdBy:req.user.userId,
  }

 
  /*
 A queryObject includes the createdBy field set to the userId 
 property of req.user. This ensures that only jobs created by 
 the authenticated user are retrieved. */

  //add stuff based on condition

  if(status && status!== 'all'){
    queryObject.status=status
  }

  /*If the status query parameter is not equal to 'all', it
 adds a condition to the queryObject to match the specified 
 status. However, if the status is equal to 'all', no specific 
 status is provided, and therefore, the queryObject remains unchanged.*/


  if(jobType && jobType!== 'all'){
    queryObject.jobType=jobType
  }

  
  if(search){
    queryObject.position={$regex: search, $options: "i"}
  }
 /* if(search){ queryObject.position={$regex: search,
   $options: "i"} } checks if the search variable has a truthy value
    (i.e., it is not null, undefined, false, 0, or an empty string).
     If search has a truthy value, it executes the following code 
     block:queryObject.position={$regex: search, $options: "i"}:
It assigns a new object to the position property of the queryObject.
The value of this object is a MongoDB regular expression query that 
performs a case-insensitive search on the position field of the jobs.
The $regex operator is used to specify the regular expression pattern,
 which is the value of the search variable.
The $options property is set to "i" to make the search case-insensitive.*/ 



  //No Await


  let result =  Job.find(queryObject) 
  
  //chain sort condition
  if(sort==="latest"){
result=result.sort("-createdAt")
  }
  if(sort==="oldest"){
    result=result.sort("createdAt")
  }
  if(sort==="a-z"){
    result=result.sort("position")
  }
  if(sort==="z-a"){
    result=result.sort("-position")
  }
  //setup pagination
  const page=Number(req.query.page) || 1
  const limit=Number(req.query.limit) || 10
  const skip=(page-1)*limit
  
  result=result.skip(skip).limit(limit)

  const jobs=await result
  const totalJobs= await Job.countDocuments(queryObject)
  const numOfPages=Math.ceil(totalJobs / limit)
res.status(StatusCodes.OK).json({jobs,totalJobs, numOfPages})


    }
/* It calls the Job.find() method, passing the queryObject, 
to retrieve the jobs that match the specified conditions. 
The result of this operation is assigned to the variable result. 
Note that no await keyword is used here, so result is a Mongoose
 Query object, not the actual array of jobs.

It then awaits the result to execute the query and retrieve the 
actual jobs. The retrieved jobs are assigned to the variable jobs.

Finally, it sends a JSON response back to the client. It uses 
res.status(StatusCodes.OK) to set the HTTP status code of the
 response to 200 (indicating a successful request), and the json method
  to send an object as the response body. The response object contains
   the jobs array, the totalJobs property representing the length of 
   the jobs array, and the numOfPages property set to 1.

In summary, the getAllJob function retrieves a list of jobs based on 
the query parameters, filters the jobs based on the authenticated
 user's ID, and sends the filtered jobs as a JSON response to the
  client.

Regenerate response*/


    //updateJob
  const updateJob= async(req, res)=>{
  const {id:jobId}=req.params
  const {company, position}=req.body;
  if(!company || !position){
throw new BadRequestError("Please provide all values")
  }
  const job =await Job.findOne({_id:jobId})
  if(!job){
    throw new NotFoundError(`No job with id: ${jobId}`)

  }

  //check permission
console.log(typeof req.user.userId)
console.log(typeof job.createdBy)

checkPermission(req.user, job.createdBy)



const updatedJob=await Job.findOneAndUpdate
  ({_id:jobId}, req.body, {
    new:true,
    runValidators:true
  })

  //job.company=company
  //job.position=position

  //await job.save();
  //res.status(StatusCodes.OK).json({job})
  res.status(StatusCodes.OK).json({updatedJob})
        }

        //deleteJob
 const deleteJob= async(req, res)=>{
  const {id:jobId}=req.params;
  const job=await Job.findOne({_id:jobId});
  if(!job){
throw new NotFoundError(`No Job with id${jobId}`)
  }
  checkPermission(req.user, job.createdBy)
  await Job.deleteOne({ _id: jobId });
  res.status(StatusCodes.OK).json({msg:"success! job remove"})
  
     }
     //showStats
    const showStats= async(req, res)=>{
    let stats=await Job.aggregate([
      {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
      {$group:{_id:`$status`, count:{$sum:1}}}
      
    ]);
    stats=stats.reduce((acc, curr)=>{
const {_id:title, count}=curr;
acc[title]=count;
return acc
    }, {})
    const defaultStats={
      Pending:stats.Pending || 0,
      Interview: stats.Interview || 0,
      Declined:stats.Declined || 0
    }
    
    let monthlyApplications= await Job.aggregate([
      {$match:{createdBy:new mongoose.Types.ObjectId(req.user.userId)}},
      {$group:{_id:{year:{$year:"$createdAt"},month:{$month:"$createdAt"}},
    
count:{$sum:1},
    }},
    {$sort:{"_id.year":-1, "_id.month":-1}},
    {$limit:6}

    ])
    monthlyApplications=monthlyApplications.map((item)=>{
const {_id:{year, month}, count}=item;
const date=moment().month(month -1).year(year).format("MMM Y")

return {date, count}
    }).reverse();
    res.status(StatusCodes.OK).json({defaultStats, monthlyApplications})
        }
/*The code showStats an asynchronous function.
 This function takes two parameters, req and res, which 
 represent the request and response objects in an Express.js server.

Inside the function, it performs the following steps:

It uses await to wait for the result of an aggregation query on the
 Job model. The aggregation query is performed using Mongoose, 
 an Object Data Modeling (ODM) library for MongoDB. The query consists
  of two stages:

The $match stage filters the documents in the Job collection by the
 createdBy field, matching it with the userId property of the req.user
  object. req.user.userId is assumed to contain the ID of the currently authenticated user.
The $group stage groups the matching documents by their status field
 and calculates the count of documents in each group using the $sum 
 operator. The result of this aggregation is an array of objects,
  where each object represents a group and contains the _id field
   (representing the status) and the count field (representing the
     number of jobs with that status).
The resulting array from the aggregation query is then processed 
using the reduce method. This method iterates over each object in 
the array and builds a new object called stats. For each object in 
the array, it extracts the _id field (status) and count field, and 
assigns them as key-value pairs in the stats object.

Finally, the function sends a JSON response back to the client. 
It uses res.status(StatusCodes.OK) to set the HTTP status code of
 the response to 200 (indicating a successful request), and the json
  method to send the stats object as the response body. The stats
   object contains the aggregated statistics of the user's jobs,
    where the status values
 are the keys and the count of jobs with each status is the value. */


export {createJob, getAllJob, updateJob, deleteJob, showStats}       