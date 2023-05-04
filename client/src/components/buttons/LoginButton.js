import './LoginButton.scss';
import { Link } from 'react-router-dom';

function LoginButton(){

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

