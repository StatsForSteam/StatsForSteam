import {BsFillReplyFill} from 'react-icons/bs';

function CreateReplyButton({ handleCreateReply }) {
    return (
        <BsFillReplyFill
        style={{ color: 'var(--tertiary-color)'}}
        size={40}
        id="add"
        onClick={handleCreateReply}
        />
    );
    }

export default CreateReplyButton;