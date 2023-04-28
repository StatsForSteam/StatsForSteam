import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useState, useEffect} from 'react';

function Welcome() {
    const [UserID, setUserID] = useState();

    useEffect(() => {
        fetch('/getUserID').then(response => 
            response.json().then(data => {
            setUserID(data["OpenIDUrl"]);
            console.log(UserID);
        }))
    }, [UserID]);

    useEffect(() => {
      fetch('/getUserID').then(response => 
        response.json().then(data => {
          console.log(data);
      }))
    }, []);

    return(
      <div>
        <h1 class="welcomeHeader"> Stats For Steam </h1>
        <h2 class="welcomeDescription"> The best place to find steam achievements {UserID}</h2>
        <LoginButton />
      </div>
    )
}

export default Welcome;