import React, {useState, useEffect} from 'react';
import { useSearchParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./Authentication.scss";
import Loading from "../components/Loading";
import Cookies from 'js-cookie';

function Authentication() {
    const [successfulLogin, setSuccessfulLogin] = useState(null);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/userAuthentication?authToken=${searchParams.get("authtoken")}`,{credentials: 'include',}).then(response => 
            response.json().then(data => {
                Cookies.set('JWT', data.JWT);
                setSuccessfulLogin(true)
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
                    <Loading/>
                )
            }
        })()}
        </div>
    );
}

export default Authentication;

