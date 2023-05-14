import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";


function Welcome() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/checkUserStatus').then(response => 
          response.json().then(data => {
          setUserLoggedIn(data)   
        }))
    }, []);

    return(
      <div>
      {(() => {
        if (userLoggedIn) {
          return (
            <Navigate replace to="/profile" />
          )
        } else {
          return (
            <div>
              <h1 className="welcomeHeader"> Stats For Steam </h1>
              <h2 className="welcomeDescription"> The best place to find steam achievements</h2>
              <LoginButton />
            </div>
          )
        }
      })()}
    </div>
    )
}

export default Welcome;