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
                    Find, Track, and Succeed with TrackJobApp

Simplify your job search with TrackJobApp. Effortlessly track and 
manage your applications, stay organized, and increase your chances
 of success. Add job listings with details like company, position, 
 and location. Monitor your application progress, from pending
  interviews to declined offers. Create a professional profile to 
  impress employers and showcase your skills. With an intuitive job
   search feature, discover relevant opportunities based on your
    preferences. Gain valuable insights with comprehensive statistics,
     including interview status and user growth trends. Rest easy
      knowing your data is secure with encrypted passwords and 
      JWT authentication.Take control of your career and sign up for
       TrackJobApp today!
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