import { IoMdAddCircle } from 'react-icons/io';
import "../../index.scss";

function CreateDiscussionButton({ handlePress }) {
  return (
    <IoMdAddCircle
      style={{ color: 'var(--tertiary-color)'}}
      size={80}
      id="add"
      onClick={handlePress}
    />
  );
}

export default CreateDiscussionButton;







