import './ViewAchievements.scss';
import { Link } from 'react-router-dom';

function ViewAchievements(){
    return (
        <div>
            <Link to="/achievements">
                <button class="viewAchievementsButton ">View Achievements</button>
            </Link>
        </div>
    )
}

export default ViewAchievements;