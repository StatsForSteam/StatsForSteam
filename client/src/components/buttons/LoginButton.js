import './LoginButton.scss';
import React, {useState, useEffect} from 'react';

function LoginButton(){

    const [OpenIDLink, setOpenIDLink] = useState();

    useEffect(() => {
        fetch('/login').then(response => 
            response.json().then(data => {
            setOpenIDLink(data["OpenIDUrl"]);
        }))
    }, [OpenIDLink]);

    return (
        <div>
            <a href={OpenIDLink}>
                Login with Steam!
            </a>
        </div>
    )
}

export default LoginButton;