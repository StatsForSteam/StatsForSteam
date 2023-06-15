import './LogoutButton.scss';
import { useNavigate } from 'react-router-dom';
import { BsSteam } from 'react-icons/bs';
import {RiLogoutBoxFill} from 'react-icons/ri';

function LogoutButton(){
    
    const navigate = useNavigate();

    const handleClick = () => {
        fetch("https://api.statsforsteam.com/api/login").then(response => 
            response.json().then(data => {
                if (data){
                    navigate('/')
                }
        }))
    }

    return (
   
                <button id="logout" onClick={handleClick}>
                   <RiLogoutBoxFill style={{ backgroundColor: 'var(--secondary-color)', color: 'var(--tertiary-color)'}} size={40}/>
                </button>
        
    )
}

export default LogoutButton;

