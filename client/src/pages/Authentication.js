import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import "./Authentication.scss";

function Authentication() {
    const [successfulLogin, setSuccessfulLogin] = useState(null);

    useEffect(() => {
        fetch('/userAuthentication').then(response => 
            response.json().then(data => {
                setSuccessfulLogin(data)
        }))
      }, []);

    return (
        <div>
        {(() => {
            if (successfulLogin) {
            return (
                <Navigate replace to="/profile" />
            )
            } else if (successfulLogin === false) {
            return (
                <div className="loading">
                    <h2 className="loadingText">Login did not work</h2>
                </div>
            )
            } else {
            return (
                <div className="loading">
                    <h2 className="loadingText">Authenticating</h2>
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
            )
            }
        })()}
        </div>
    );
}

export default Authentication;

