import './LoginButton.scss';
import { Link } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import { BsSteam } from 'react-icons/bs';
import { isUUID } from 'validator';

function LoginButton(){
    const [sessionsid, setSessionSID] = useState();
    const [sessionGrabbed, setSessionGrabbed] = useState(false);

    useEffect(() => {
        fetch('/getSessionSID').then(response => 
            response.json().then(data => {
                console.log(data)
                setSessionSID(data)
                setSessionGrabbed(true)
        }))
    }, []);

    return (
        sessionGrabbed ? (
            <div className="loginButtonFlex">
                <Link to="http://127.0.0.1:5000/login">
                    <button type="button" className="btn btn-primary btn-lg">
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

