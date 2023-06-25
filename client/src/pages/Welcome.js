import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";

function Welcome() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      const fetchSession = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/checkSession', {credentials: "include",});
          setIsLoading(false);
          if (response.status === 200) {
              setIsAuthenticated(true);
          } else if (response.status === 401) {
              setIsAuthenticated(false);
          } else {
              throw new Error('Failed to fetch session');
          }
          } catch (error) {
            console.error(error);
          }
      };
  
      fetchSession();
  }, []);

  if (isLoading) {
      return <div></div>;
  }

  return isAuthenticated ? <Navigate to="/profile" /> 
  : (
      <div>
        <div id="background">
          <div id="backgroundOverlay">
              <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand mx-auto">This website is currently in Beta. 
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

export default Welcome;

