import './LoginButton.scss';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';


function LoginButton(){

    useEffect(() => {
        fetch('/getSessionSID').then(response => 
            response.json().then(data => {
              console.log(data)
        }))
      }, []);

    return (
        <div className="loginButtonFlex">
            <Link to="http://127.0.0.1:5000/login?login=true">
                <button type="button" className="btn btn-primary">
                    Login with Steam
                </button>
            </Link>
        </div>
    )
}

export default LoginButton;

