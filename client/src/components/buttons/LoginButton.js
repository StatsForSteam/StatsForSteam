import './LoginButton.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { BsSteam } from 'react-icons/bs';

function LoginButton(props){
    return (
        <div className="loginButtonFlex">
            <Link to={"http://127.0.0.1:8000/api/login"}>
                <button style={{backgroundColor: 'var(--tertiary-color)'}}type="button" className="btn btn-primary btn-lg">
                    <div className="loginInnerButtonFlex">
                        Login with Steam
                        <BsSteam size={45}/>
                    </div>
                </button>
            </Link>
        </div>
    )
}

export default LoginButton;

