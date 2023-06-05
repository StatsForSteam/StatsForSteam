import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import { Badge } from 'react-bootstrap';
import './PostButton.scss';
import '../../index.scss';

function SeeRepliesButton({ showReplies, numReplies, handleSeeReplies }) {
  return (
    <>
      {numReplies > 0 && <span style={{ marginRight: '5px' }}>{numReplies} replies</span>}
      
      {numReplies > 0 && (
        <>
          {showReplies ? (
            <MdExpandLess
              className="PostButton"
              style={{ color: 'var(--tertiary-color)', marginRight: '0.5em' }}
              size={40}
              onClick={handleSeeReplies}
            />
          ) : (
            <MdExpandMore
              className="PostButton"
              style={{ color: 'var(--tertiary-color)', marginRight: '0.5em' }}
              size={40}
              onClick={handleSeeReplies}
            />
          )}
        </>
      )}
    </>
  );
}

export default SeeRepliesButton;




