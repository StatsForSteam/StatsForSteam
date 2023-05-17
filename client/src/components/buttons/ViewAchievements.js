import './ViewAchievements.scss';
import { Link } from 'react-router-dom';
import {ImStatsBars} from 'react-icons/im';

function ViewAchievements(props){
    return (
        <div>
            <Link 
                to={"/Achievements"}
                state={props}
            >
                <button className="viewAchievementsButton "><ImStatsBars/></button>
            </Link>
        </div>
    )
}

export default ViewAchievements;



