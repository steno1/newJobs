//import main from "../assets/images/main.svg"

import { BlueLogo } from "../components"
import { Link } from "react-router-dom"
import Wrapper from "../assets/wrappers/LandingPage.js"
import undraw from "../assets/images/undraw_Interview.png"

function Landing(){
    return(
        <Wrapper>
            <nav>
            <BlueLogo/>
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>Job<span>Finding</span>app</h1>
                    <p>
         JobFindingApp is a MERN (MongoDB, Express, React, Node.js) 
         stack application for job applications.It allows users to browse
        and search for job listings, create and update their profiles.
                    </p>
     <Link to="/register" className="btn btn-hero">
       Login/Register
      </Link>
                </div>
  <img src={undraw} alt="job hunt" className="img main-img"/>
            </div>
        </Wrapper>
    )
}

export default Landing