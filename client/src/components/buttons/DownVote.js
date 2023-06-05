import { ImArrowDown } from 'react-icons/im';
import "../../index.scss";

function DownVote({ handleVote, ExistingVoteType }) {
  return (
    <ImArrowDown
      onClick={() => handleVote('downvote')}
      size={30}
      style={{ color: ExistingVoteType === 'downvote' ? 'var(--tertiary-color)' : 'var(--quaternary-color)', opacity: ExistingVoteType === 'downvote' ? '0.8' : '0.4'}}
    />
  );
}

export default DownVote;
