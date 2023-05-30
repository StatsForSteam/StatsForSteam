import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import "./Authentication.scss";
import Loading from "../components/Loading";
function Authentication() {
    const [successfulLogin, setSuccessfulLogin] = useState(null);

    useEffect(() => {
        fetch('/userAuthentication')
    .then(response => response.json())
    .then(data => {
        setSuccessfulLogin(data);
        
        fetch('/getUserData')
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('username', data.username);
                localStorage.setItem('profilePicture', data.profile_picture);
            });
    });

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
                <Loading/>
            )
            }
        })()}
        </div>
    );
}

export default Authentication;

