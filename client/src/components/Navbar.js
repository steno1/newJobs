import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaAlignLeft, FaUserCircle,FaCaretDown} from 'react-icons/fa';
import { useAppContext} from "../context/appContext.js"
import BlueLogo from './logo';
import { useState } from 'react';

const Navbar = () => {
  const [showLogout, setShowLogOut]=useState(false)

  const {toggleSidebar, logOutUser, user}=useAppContext();
  return (
    <Wrapper>
       <div className='nav-center'>
       <button className='toggle-btn'
       onClick={toggleSidebar} >
        <FaAlignLeft/>
        </button> 
        <div>
        <BlueLogo/>
        <h3 className='logo-text'>DashBoard</h3>
        </div>
        <div className='btn-container'>
<button type='button' className='btn' 
onClick={()=>setShowLogOut(!showLogout)}>
<FaUserCircle/>
{user?.name}

<FaCaretDown/>
</button>
<div className={showLogout? "dropdown show-dropdown":"dropdown" }>
<button type='button' className='dropdown-btn'
 onClick={logOutUser}>
  logout
</button>
</div>
        </div>
       
       </div>
      
     
    </Wrapper>
  )
}

export default Navbar
