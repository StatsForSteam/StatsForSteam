import {BsFillReplyFill} from 'react-icons/bs';
import './PostButton.scss';

function CreateReplyButton({ handleCreateReply }) {
    return (
        <BsFillReplyFill
        className="PostButton"
        style={{ color: 'var(--tertiary-color)'}}
        size={40}
        id="add"
        onClick={handleCreateReply}
        />
    );
    }

export default CreateReplyButton;