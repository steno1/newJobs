import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { FaTimes } from 'react-icons/fa'
import {useAppContext} from "../context/appContext"
import BlueLogo from './logo'
import NavLinks from './NavLinks'

const SmallSideBar = () => {
  const {showSideBar, toggleSidebar}=useAppContext()
  return (
   <Wrapper>
    <div className={showSideBar? "sidebar-container show-sidebar":"sidebar-container"}>
      <div className='content'>
<button type='button' className='close-btn' 
onClick={toggleSidebar}>
<FaTimes/>
</button>
<header>
<BlueLogo/>
</header>
<NavLinks toggleSidebar={toggleSidebar}/>


      </div>

    </div>
   </Wrapper>
  )
}
/*The NavLink component is an extension of Link
 with additional features for styling and handling the active state.
 It is especially useful for creating navigation menus where 
   you want to highlight the currently active route. NavLink applies
an active class to the rendered element when it matches the
current URL. You can customize the class name by specifying
 the activeClassName prop. */

export default SmallSideBar
