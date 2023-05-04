import './LoginButton.scss';
import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

function LoginButton(){

    const [OpenIDLink, setOpenIDLink] = useState();

    useEffect(() => {
        fetch('/login').then(response => 
            response.json().then(data => {
            setOpenIDLink(data["OpenIDUrl"]);
        }))
    }, [OpenIDLink]);

    return (
        <div className="loginButtonFlex">
            <Link to="https://localhost:8080/login?login=true">
                <button type="button" class="btn btn-primary">
                    Login with Steam
                </button>
            </Link>
        </div>
    )
}

export default LoginButton;

