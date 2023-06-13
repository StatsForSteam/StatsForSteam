import { MdForum } from 'react-icons/md';
import { Link } from 'react-router-dom';
import './GameCardButton.scss';

function ForumsButton(props) {
  const buttonClassName = props.fromDashboard ? 'DashboardButton' : 'GameCardButton';

  return (
    <div>
      <Link to="/Forums" state={props}>
        <button className={buttonClassName}>
          <MdForum />
        </button>
      </Link>
    </div>
  );
}

export default ForumsButton;
