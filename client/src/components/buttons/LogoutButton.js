import './LogoutButton.scss';
import { useNavigate } from 'react-router-dom';
import {RiLogoutBoxFill} from 'react-icons/ri';

function LogoutButton(){
    
    const navigate = useNavigate();

    const handleClick = () => {
        fetch("http://127.0.0.1:8000/api/logout", {credentials: 'include'}).then(response => 
            response.json().then(data => {
                if (data){
                    localStorage.removeItem('profilePicture');
                    localStorage.removeItem('username');
                    localStorage.removeItem('loggedIn');
                    navigate('/');
                }
        }))
    }

    return (
   
                <button id="logout" onClick={handleClick}>
                   <RiLogoutBoxFill style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--clickable-color)'}} size={40}/>
                </button>
        
    )
}

export default LogoutButton;

