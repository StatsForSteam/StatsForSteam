import './LogoutButton.scss';
import { useNavigate } from 'react-router-dom';
import { BsSteam } from 'react-icons/bs';

function LogoutButton(){
    
    const navigate = useNavigate();

    const handleClick = () => {
        fetch('/logout').then(response => 
            response.json().then(data => {
                if (data){
                    navigate('/')
                }
        }))
    }

    return (
        <div className="logoutButtonFlex">
                <button type="button" className="btn btn-primary btn-feature btn-sm" onClick={handleClick}>
                    <div className="logoutInnerButtonFlex">
                        Logout
                        <BsSteam size={15}/>
                    </div>
                </button>
        </div>
    )
}

export default LogoutButton;

