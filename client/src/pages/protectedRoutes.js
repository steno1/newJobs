import React from 'react'
import { useAppContext } from '../context/appContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const {user}=useAppContext();
    if(!user){
        return <Navigate to="/landing"/>
    }
  return (
children
  )
}
/* 
In the ProtectedRoutes component, the children prop represents
 the components or elements that are passed as children to the
  ProtectedRoutes component when it is used. These children
 components will be rendered within the ProtectedRoutes
  component's JSX structure. In this specific code, the ProtectedRoutes 
component checks for the existence of a user in the application
 context using the useAppContext hook. If there is no user, 
 it returns a <Navigate> component from the react-router-dom library,
  which redirects the user to the "/landing" route.

If there is a user, the return children; statement is executed, 
rendering the children components or elements that were passed to
 the ProtectedRoutes component.
*/

export default ProtectedRoutes
