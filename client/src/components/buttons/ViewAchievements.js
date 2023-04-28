import './ViewAchievements.scss';
import { Link } from 'react-router-dom';

function ViewAchievements(props){
    return (
        <div>
            <Link 
                to={"/Achievements"}
                state={props.appid}
            >
                <button class="viewAchievementsButton ">View Achievements</button>
            </Link>
        </div>
    )
}

export default ViewAchievements;