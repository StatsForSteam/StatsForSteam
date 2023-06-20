import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";

function Welcome() {
  const [userLoggedIn, setUserLoggedIn] = useState(0);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('loggedIn');
    if (loggedInStatus === 'true'){
      setUserLoggedIn(1);
    } else {
      setUserLoggedIn(2)
    }
  }, []);

  return(
    <div>
    {(() => {
      if (userLoggedIn === 1) {
        return (
          <Navigate replace to="/profile" />
        )
      } else if (userLoggedIn === 0){
        <div></div>          
      } else {
        return (
          <div>
            <div id="background">
              <div id="backgroundOverlay">
                  <nav class="navbar navbar-light bg-light">
                    <a class="navbar-brand mx-auto">This website is currently in Alpha. 
                    Check out the progress on our <a href="https://github.com/StatsForSteam/StatsForSteam" 
                    target="blank" >GitHub!</a></a>
                  </nav>
                    <div id="container">
                        <h1 className="welcomeHeader"> Stats For Steam </h1>
                        <h2 className="welcomeDescription"> The best place to find steam achievements</h2>
                        <LoginButton/>  
                     </div>
                  </div>
              </div>
          </div>
        )
      }
    })()}
  </div>
  )
}

export default Welcome;

