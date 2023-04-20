import "./Welcome.scss";
import LoginButton from "../components/buttons/LoginButton";
import React, {useEffect} from 'react';

function Welcome() {
    useEffect(() => {
      fetch('/login').then(response => 
        response.json().then(data => {
          console.log(data);
      }))
    }, []);
      
    return(
      <div>
        <h1 class="welcomeHeader"> Stats For Steam </h1>
        <h2 class="welcomeDescription"> The best place to find steam achievements</h2>
        <LoginButton />
      </div>
    )
}

export default Welcome;