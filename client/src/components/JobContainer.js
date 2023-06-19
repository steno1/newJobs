import { useEffect } from 'react'
import Loading from './Loading'
import {useAppContext} from "../context/appContext"
import Job from "./Job"

import Wrapper from '../assets/wrappers/JobsContainer'


import React from 'react'
import PageBtnContainer from './PageBtnContainer'

const JobContainer = () => {
const {getJob, jobs, isLoading,
   page, totalJobs, search, searchStatus,
  searchType, sort, numOfPages}=useAppContext()

useEffect(()=>{
  getJob()
   // eslint-disable-next-line
}, [search, searchStatus, searchType, sort, page])
//basically the status in state. Added to the dependency array
if(isLoading){
return<Loading center/>
}
if(jobs.length===0){
  return<Wrapper>
    <h2>No Jobs to display...</h2>
  </Wrapper>
}
  return (
 <Wrapper>
    <div>
     <h5><strong>{totalJobs} Job{jobs.length >1 && "s"} found</strong></h5> 
    </div>
    <div className='jobs'>
{jobs.map((job)=>{
  return <Job key={job._id}{...job}/>
})}
    </div>
    {numOfPages >1 && <PageBtnContainer/>}
    </Wrapper>)
}

export default JobContainer
