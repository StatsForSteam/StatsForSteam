import {MdExpandMore} from 'react-icons/md';

function SeeRepliesButton({ handleSeeReplies }) {

    return (
        <MdExpandMore
        style={{ color: 'var(--tertiary-color)'}}
        size={40}
        onClick={handleSeeReplies}
        />
    );
    }

export default SeeRepliesButton;

