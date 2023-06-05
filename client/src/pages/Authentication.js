import React, {useState, useEffect} from 'react';
import { Navigate } from "react-router-dom";
import "./Authentication.scss";
import Loading from "../components/Loading";
import Cookies from 'js-cookie';

function Authentication() {
    const [successfulLogin, setSuccessfulLogin] = useState(null);
    Cookies.set("tester", "lets get it");

    const GetCookie = () => {
        alert(Cookies.get('SteamID'));
      };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/userAuthentication`).then(response => 
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
                <button onClick={GetCookie}>Get Cookie</button>
            )
            }
        })()}
        </div>
    );
}

export default Authentication;

