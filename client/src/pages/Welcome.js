import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import { validate as isValidUUID } from 'uuid';

function Welcome() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [sessionSID, setSessionSID] = useState(false);

  useEffect(() => {
      fetch('/checkUserStatus').then(response => 
        response.json().then(data => {
          setUserLoggedIn(data['userLogged'])

          if (isValidUUID(data['SessionID'])){ //Not necessary but is more safe
            setSessionSID(data['SessionID'])          
          }
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
            <LoginButton sessionSID={sessionSID}/>
          </div>
        )
      }
    })()}
  </div>
  )
}

export default Welcome;