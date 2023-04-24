import './LoginButton.scss';
import React, {useState, useEffect} from 'react';

function LoginButton(){

    const [OpenIDLink, setOpenIDLink] = useState();

    useEffect(() => {
        fetch('/login').then(response => 
            response.json().then(data => {
            console.log(OpenIDLink)
            setOpenIDLink(data["OpenIDUrl"]);
            console.log(OpenIDLink)
        }))
    }, []);

    return (
        <div>
            <a href={OpenIDLink}>
                Login with Steam!
            </a>
        </div>
    )
}

export default LoginButton;