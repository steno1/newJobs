import React from 'react'
import { FaTimes } from 'react-icons/fa'
import {useAppContext} from "../context/appContext"
import BlueLogo from './logo'
import NavLinks from './NavLinks'
import Wrapper from '../assets/wrappers/BigSidebar'

const BigSideBar = () => {
  const {showSideBar, toggleSidebar}=useAppContext();
  return (
   <Wrapper>
    <div className={showSideBar?
       "sidebar-container ":"sidebar-container show-sidebar"}>
<div className='content'>
  <header>
    <BlueLogo />
  </header>
  <NavLinks toggleSidebar={toggleSidebar}/>

</div>
    </div>
   </Wrapper>
  )
}

export default BigSideBar
