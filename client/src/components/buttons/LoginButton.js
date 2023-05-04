import './LoginButton.scss';
import { Link } from 'react-router-dom';

function LoginButton(){

    return (
        <div className="loginButtonFlex">
            <Link to="http://127.0.0.1:5000/login?login=true">
                <button type="button" class="btn btn-primary">
                    Login with Steam
                </button>
            </Link>
        </div>
    )
}

export default LoginButton;

