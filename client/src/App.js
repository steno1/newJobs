import React from "react";
import { Landing, Register, Error, ProtectedRoutes } from "./pages";
import {AddJob, AllJobs, ProFile, SharedLayout, Stats}from "./pages/dashBoard";
import {BrowserRouter,Routes,Route} from "react-router-dom";

function App() {
  return (
  <>
   <BrowserRouter>
   
    <Routes>
    <Route path="/" element={

      <ProtectedRoutes>
        <SharedLayout/>
         </ProtectedRoutes>

    }>
    <Route path="add-Jobs" element={<AddJob/>}/>
    <Route path="all-Jobs" element={<AllJobs/>}/>
    <Route path="profile" element={<ProFile/>}/>
    <Route index element={<Stats/>}/>
    </Route>

    <Route path="/register" element={<Register/>}/>
    <Route path="/landing" element={<Landing/>}/>
    <Route path="*" element={<Error/>}/>
    </Routes>
   </BrowserRouter>

  </>
   
  );
}

export default App;
