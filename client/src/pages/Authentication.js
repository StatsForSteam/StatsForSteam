import React, {useState, useEffect} from 'react';
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Authentication.scss";
import Loading from "../components/Loading";

function Authentication() {
    const [successfulLogin, setSuccessfulLogin] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/userAuthentication?authToken=${searchParams.get("authtoken")}`,{credentials: 'include',})
        .then(response => response.json())
        .then(data => {
            setSuccessfulLogin(true);
            localStorage.setItem('username', data.username);
            localStorage.setItem('profilePicture', data.pfp);
            localStorage.setItem('loggedIn', true)
            }
        );   
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