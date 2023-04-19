import './LoginButton.scss';
import { Link } from 'react-router-dom';

function LoginButton(){
    return (
        <div>
            <Link to="/login">
                <button class="loginButton">Login</button>
            </Link>
        </div>
    )
}

export default LoginButton;