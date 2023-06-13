import './GameCardButton.scss';
import { Link } from 'react-router-dom';
import {FaMedal} from 'react-icons/fa';

function ViewAchievements(props){
    const buttonClassName = props.fromDashboard ? 'DashboardButton' : 'GameCardButton';
    return (
        <div>
            <Link 
                to={"/Achievements"}
                state={props}
            >
                <button className={buttonClassName}><FaMedal/></button>
            </Link>
        </div>
    )
}

export default ViewAchievements;



