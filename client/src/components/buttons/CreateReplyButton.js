import {BsFillReplyFill} from 'react-icons/bs';
import './PostButton.scss';

function CreateReplyButton({ handleShowReplyForm }) {
    return (
        <BsFillReplyFill
        className="PostButton"
        style={{ color: 'var(--clickable-color)'}}
        size={40}
        id="add"
        onClick={handleShowReplyForm}
        />
    );
    }

export default CreateReplyButton;