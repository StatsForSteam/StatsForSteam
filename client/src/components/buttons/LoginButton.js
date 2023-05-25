import './LoginButton.scss';
import { Link } from 'react-router-dom';
import React from 'react';
import { BsSteam } from 'react-icons/bs';

function LoginButton(props){
    return (
        props.sessionSID ? (
            <div className="loginButtonFlex">
                <Link to={"http://172.18.0.3:5000/login?session=" + props.sessionSID}>
                    <button style={{backgroundColor: 'var(--tertiary-color)'}}type="button" className="btn btn-primary btn-lg">
                        <div className="loginInnerButtonFlex">
                            Login with Steam
                            <BsSteam size={45}/>
                        </div>
                    </button>
                </Link>
            </div>
        ) : (
            <div className="loginButtonFlex">
                <button type="button" className="btn btn-primary btn-lg">
                    <div className="loginInnerButtonFlex">
                        Login with Steam
                        <BsSteam size={45}/>
                    </div>
                </button>
            </div>
        )
    )
}

export default LoginButton;

