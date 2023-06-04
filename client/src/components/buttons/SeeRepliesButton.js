import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Badge } from 'react-bootstrap';
import './PostButton.scss';
import '../../index.scss';

function SeeRepliesButton({ showReplies, numReplies, handleSeeReplies }) {
  return (
    <>
      
        <Badge pill bg="dark" style={{ color: 'var(--tertiary-color)', fontSize: '1em' }}>
          {numReplies} replies
        </Badge>
      
      {showReplies ? (
        <MdExpandLess
          className="PostButton"
          style={{ color: 'var(--tertiary-color)', marginRight: '0.5em'}}
          size={40}
          onClick={handleSeeReplies}
        />
      ) : (
        <MdExpandMore
          className="PostButton"
          style={{ color: 'var(--tertiary-color)', marginRight: '0.5em'}}
          size={40}
          onClick={handleSeeReplies}
        />
      )}
    </>
  );
}

export default SeeRepliesButton;




