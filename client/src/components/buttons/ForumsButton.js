import {MdForum} from 'react-icons/md';
import { Link } from 'react-router-dom';
import './GameCardButton.scss';

function ForumsButton(props){
    return (
        <div>
            <Link 
                to={"/Forums"}
                state={props}
            >
                <button className="GameCardButton"><MdForum/></button>
            </Link>
        </div>
    )
}

export default ForumsButton;