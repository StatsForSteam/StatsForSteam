import './ViewAchievements.scss';
import { Link } from 'react-router-dom';

function ViewAchievements(props){
    return (
        <div>
            <Link 
                to={"/Achievements"}
                state={props.appid}
            >
                <button className="viewAchievementsButton ">View Stats</button>
            </Link>
        </div>
    )
}

export default ViewAchievements;



