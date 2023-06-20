/*
In the context of React, the Context API is a feature 
that allows data to be shared and accessed across multiple
 components without the need to pass props explicitly through 
 the component tree. It provides a way to create a global state
  that can be accessed by any component within a React application.

The Context API consists of two main components: the context provider
 and the context consumer. The provider component is responsible for 
 defining the data that will be made available to the consuming
  components. It wraps around the part of the component tree where
 the data is needed. The consumer component, on the other hand,
 is used by the components that want to access the data provided by
  the context provider.
*/
import React from "react";
import { useReducer, useContext} from "react";
import axios from "axios"
import reducer from "./reducer";
import { DISPLAY_ALERT,
     CLEAR_ALERT,
     SETUP_USER_BEGIN,
      SETUP_USER_SUCCESS,
       SETUP_USER_ERROR,
       TOGGLE_SIDEBAR,
       LOGOUT_USER, 
       UPDATE_USER_BEGIN,
       UPDATE_USER_SUCCESS,
       UPDATE_USER_ERROR,
       HANDLE_CHANGE,
       CLEAR_VALUES,
       CREATE_JOB_BEGIN,
       CREATE_JOB_SUCCESS,
       CREATE_JOB_ERROR,
       GET_JOB_BEGIN,
       GET_JOB_SUCCESS,
       SET_EDIT_JOB,
       DELETE_JOB_BEGIN,
       EDIT_JOB_BEGIN,
        EDIT_JOB_SUCCESS,
        EDIT_JOB_ERROR, 
        SHOW_STAT_BEGIN,
        SHOW_STAT_SUCCESS, 
        CLEAR_FILTER,
        CHANGE_PAGE
 } from "./actions";

const token=localStorage.getItem("token");
/* 
const token = localStorage.getItem("token");
 Retrieves the "token" value 
from the browser's localStorage.
*/
const user=localStorage.getItem("user")
/* 
const user = localStorage.getItem("user"); Retrieves the "user"
 value from the browser's localStorage.

*/
const userLocation=localStorage.getItem("location")
/* 
const userLocation = localStorage.getItem("location"); Retrieves the "location"
 value from the browser's localStorage.*/

 const initialState={
    isLoading:false,
    showAlert:false,
    alertText:"",
    alertType:"",
    user: user? JSON.parse(user): null,
    token:token, 
    //jobs
    userLocation:userLocation || '',
    isEditing:false,
    editingJobId:'',
    position:"",
    company:"",
    jobLocation:userLocation || '',
    jobTypeOptions:["Full-time", "Part-time", "Remote", "Internship"],
    jobType:"Full-time",
    showSideBar:false,
    statusOptions: ["Interview", "Declined", "Pending"],
    status:"Pending",
    jobs:[],
    totalJobs:0,
    numOfPages:1,  
    page:1, 
    stats:{},
    monthlyApplications:[],
    search:"",
    searchStatus:"all",
    searchType: "all",
    sort:"latest",
    sortOptions:['latest', 'oldest', 'a-z', 'z-a']
}

//create Context
 const AppContext=React.createContext(); //creates a new context object
 const AppProvider=({children})=>{
    /*useReducer: It is a hook from React that allows you 
    to manage state using the reducer pattern. It takes a
     reducer function and an initial state as arguments and
      returns an array with  the current state and a
       dispatch function. 
    
    */
  
   const [state, dispatch]=useReducer(reducer, initialState);
    //axios
   const axiosInstance = axios.create({
    baseURL: '/api/v1', // Replace with your API base URL
   
  });
  //request
  axiosInstance.interceptors.request.use((config)=>{
    config.headers['Authorization']=`Bearer ${state.token}`
    
    return config
  },
  
  (error)=>{
    return Promise.reject(error)
  })
  //response
  axiosInstance.interceptors.response.use((response)=>{
    
    return response
  },
  
  (error)=>{
    console.log(error.response)
    if(error.response.status===401){
      logOutUser(); 
    }
    return Promise.reject(error)
  })

    
    /* reducer: It is a separate file that contains
     the reducer function responsible for updating 
    the state based on dispatched actions.*/
    /* 
    const [state, dispatch] = useReducer(reducer, initialState);
    Uses the useReducer hook to manage state. It takes the 
    "reducer" function and the "initialState" as arguments and
     returns the current state and a dispatch function. 
     The "state" will hold the current state value, and "dispatch"
     will be used to dispatch actions to update the state.
    
    */

    //different actions is being dispatched
   const displayAlert=()=>{
    dispatch({
        type:DISPLAY_ALERT
    })
    clearAlert();
   } 

   const clearAlert=()=>{
    setTimeout(()=>{
        dispatch({
            type:CLEAR_ALERT
        }) 
    }, 3000)
   } 
const addUserToLocalStorage=({user, token, location})=>{
localStorage.setItem("user", JSON.stringify(user))
localStorage.setItem("token", (token))
localStorage.setItem("location",(location))
}

/* 
const addUserToLocalStorage = ({ user, token, location }) =>
 { ... }: Defines a function called "addUserToLocalStorage" 
 that stores the "user," "token," and "location"
 values in the browser's localStorage.
*/

const removeUserFromLocalStorage=()=>{
localStorage.removeItem("token")
localStorage.removeItem("user")
localStorage.removeItem("location")

}
/* 
const removeUserFromLocalStorage = () => { ... }: 
Defines a function called "removeUserFromLocalStorage" 
that removes the "token," "user," 
and "location" values from the browser's localStorage.
*/
       const setupUser=async ({currentUser, endPoint, alertText})=>{
    
    
        dispatch({
            type:SETUP_USER_BEGIN
        })
        try {
           const {data}=await axiosInstance.post
           (`/auth/${endPoint}`,
            currentUser);
           
           
           const {user, token, location }=data;
           
           dispatch({
            type:SETUP_USER_SUCCESS,
            payload:{
                user, token, location, alertText
            }
           })
           addUserToLocalStorage({user, token, location});
          
        } catch (error) {
            
            dispatch({
                type:SETUP_USER_ERROR,
                payload:{
                    msg:error.response.data.msg
                }
            })
        }
        clearAlert()
           }
//toggleSideBar
const toggleSidebar=()=>{
    dispatch({
        type:TOGGLE_SIDEBAR
    })
}
//logout user
const logOutUser=()=>{
    dispatch({
        type:LOGOUT_USER })
        removeUserFromLocalStorage();
} 


//updateUser
 const updateUser=async (currentUser)=>{
    dispatch({type:UPDATE_USER_BEGIN})
try {
 const {data}=await axiosInstance.patch("/auth/update",currentUser)

 const {user, location, token}=data

 dispatch({type:UPDATE_USER_SUCCESS,
payload:{user,location, token}})
addUserToLocalStorage({user, location, token,})
 
} catch (error) {
    if(error.response.status !==401){
        dispatch({type:UPDATE_USER_ERROR,
            payload:{msg:error.response.data.msg}
            
            })
    }
  
}
clearAlert();
} 

const handleChange=({name, value})=>{
dispatch({type:HANDLE_CHANGE, 
payload:{name, value}})
}


const clearValues=()=>{
    dispatch({type:CLEAR_VALUES})
}

const createJob=async()=>{
dispatch({type:CREATE_JOB_BEGIN});
try {
  const {position, company, jobLocation, jobType, status}=state;
  await axiosInstance.post("/jobs",{
position,
 company,
 jobLocation,
 jobType,
  status
  }) 
  dispatch({type:CREATE_JOB_SUCCESS});
  dispatch({type:CLEAR_VALUES})
} catch (error) {
   if(error.response.status===401)return
   dispatch({type:CREATE_JOB_ERROR,
payload:{
    msg:error.response.data.message
}}) 
}

}
const getJob= async ()=>{
    const {search, searchStatus, searchType, sort, page}=state
    let url=`/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`
    
    //optionally, if search is not empty, add it to url
if(search){
url=url+ `&search=${search}`
}

dispatch({type:GET_JOB_BEGIN});
try {
   const {data}=await axiosInstance.get(url);
   const {jobs, totalJobs, numOfPages}=data;
   dispatch({type:GET_JOB_SUCCESS,
    payload:{
        jobs, totalJobs, numOfPages
    }
})

} catch (error) {
   // console.log(error.response)
    //logOutUser
    logOutUser();
}
clearAlert();
}
const setEditJob=(id)=>{
dispatch({type:SET_EDIT_JOB,
     payload:{id}
    
    })
  
}
const editJob=async()=>{
    dispatch({type:EDIT_JOB_BEGIN})
    try {
 const {position, company, jobLocation, jobType, status}=state
     await axiosInstance.patch(`/jobs/${state.editingJobId}`, {

        position,
        company,
        jobLocation,
        jobType,
        status
     }) 
     dispatch({type:EDIT_JOB_SUCCESS})
     dispatch({type:CLEAR_VALUES})
    } catch (error) {
        if(error.response.status===401)return
        dispatch({
            type:EDIT_JOB_ERROR,
            payload:{msg:error.response.data.msg}
        })
    }
    clearAlert()
}

const deleteJob=async(jobId)=>{
    dispatch({type:DELETE_JOB_BEGIN})
    try {
        await axiosInstance.delete(`/jobs/${jobId}`)
        getJob();
    } catch (error) {
       // console.log(error.response)
        //logOutUser()
        logOutUser()
    }

    
 }
 
 const showStats=async()=>{
dispatch({type:SHOW_STAT_BEGIN })
try {
    const {data}=await axiosInstance(`/stats`)

    dispatch({type:SHOW_STAT_SUCCESS, payload:{
        stats:data.defaultStats,//from job controller
        monthlyApplications:data.monthlyApplications
        
    }})
    
} catch (error) {
    //logOutUser()
    logOutUser()
    
}
clearAlert()
 }

 const clearFilters=()=>{
dispatch({type:CLEAR_FILTER})

 }

 const changePage=(page)=>{
    dispatch({type:CHANGE_PAGE, payload:{page}})
 }
    return (
        <AppContext.Provider value={{
            ...state,
            displayAlert, clearAlert,
             setupUser,toggleSidebar,
              logOutUser, updateUser,
               handleChange, clearValues,
                createJob, getJob, 
                setEditJob, deleteJob,
                editJob, showStats, 
                clearFilters, changePage
        }}>
        {children}

        </AppContext.Provider>
    )
}
/* The state object and other functions are passed as a value to the 
AppContext.Provider component, making it available to all
 the components that are descendants of the AppProvider component:*/

//custom hook
 const useAppContext=()=>{
    //useContext is from react
    //we can then be able to access our state by passing AppContext
    return useContext(AppContext)
}

export{AppProvider, initialState, useAppContext}