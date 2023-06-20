import { IoMdAddCircle, IoMdRemoveCircle } from 'react-icons/io';
import "../../index.scss";
import './CreateDiscussionButton.scss';

function CreateDiscussionButton({ handlePress, showCreateMenu }) {
  return (
    <>
      {showCreateMenu ? (
        <IoMdRemoveCircle
        className="test"
          style={{ color: 'var(--clickable-color)' }}
          size={80}
          onClick={handlePress}
        />
      ) : (
        <IoMdAddCircle
        className="test"
          style={{ color: 'var(--clickable-color)' }}
          size={80}
          onClick={handlePress}
        />
      )}
    </>
  );
}

export default CreateDiscussionButton;








