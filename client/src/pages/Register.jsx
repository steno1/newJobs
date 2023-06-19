import { useState, useEffect } from "react";
/*
useState and useEffect are hooks from the React library used
 for managing state and side effects.

*/
import { BlueLogo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage.js";
import { useAppContext } from "../context/appContext";
import {useNavigate} from "react-router-dom"

const initialState={
    name:"",
    email:"",
    password:"",
    isMember:true,
  
        }
        
const Register=()=>{
  const navigate=useNavigate();

  const [values, setValues]=useState(initialState);

  //change anytime something in input is typed
  const {user, isLoading, showAlert, displayAlert,
  registerUser, loginUser, setupUser
  }=useAppContext();
  /* 
  The useAppContext hook is used to access the global
   state and retrieve the user, isLoading, showAlert,
    displayAlert, and registerUser values.
  */
  

 const toggleMember=(e)=>{
  setValues(
    {...values,
     isMember:!values.isMember}
     )
 } 
  
  
  const handleChange=(e)=>{
    console.log(e.target)//shows input we are working on
  setValues({
    ...values,//get current value in the state
    [e.target.name]:e.target.value//we use dynamic object, javascript

  })
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    const {name, email, password, isMember}=values;
    //check whether email or password or name if he is not
    //a member is missing, then displayAlert();
    if(!email || !password || (!isMember && !name)){
displayAlert();
//if is the case,  then return
return
    }
    const currentUser={name, email, password}
    if(isMember){
      setupUser({currentUser,
      endPoint:"login",
    alertText:"Login Successful! Redirecting..."});
    }else{
      setupUser({currentUser,
        endPoint:"register",
      alertText:"User Created! Redirecting..."});
    }
    console.log(values)
  }
  useEffect(()=>{
if(user){
  setTimeout(()=>{
    navigate("/")
  }, 3000)
 
}
  }, [user, navigate]) 
  /* 
  The useEffect hook is used to watch for changes in the user
   and navigate variables. When the user variable changes 
   (indicating a successful registration), it waits for 3 seconds
    and then navigates to the "/" route.
  
  */
    return (
        <Wrapper className="full-page">
<form className="form" 
onSubmit={handleSubmit}>
<div className="findLogo">
<BlueLogo/>
</div>
<h3>{values.isMember ? 'Login': "Register"}</h3>
{showAlert && <Alert/>}
{/*name input */}
{!values.isMember && (

<FormRow type="text"
 name="name"
  value={values.name}
    handleChange={handleChange}
/>
)}

{/*Email input */}
<FormRow type="email"
 name="email"
  value={values.email}
    handleChange={handleChange}
/>
{/*password input */}
<FormRow type="password"
 name="password"
  value={values.password}
    handleChange={handleChange}
   
/>


<button type="submit" 
className="btn btn-block"
disabled={isLoading}>
    Submit
</button>
<p>
{values.isMember?"Not a member yet?":"Already a member?"}
  <button type="button"
  onClick={toggleMember}
   className="member-btn">
   {values.isMember? "Register": 'Login'}
   </button>
</p>
</form>
        </Wrapper>
    )
}
export default Register;