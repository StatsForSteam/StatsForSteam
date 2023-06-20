import { ImArrowUp } from 'react-icons/im';
import "../../index.scss";
function UpVote({ handleVote, ExistingVoteType  }) {
  return (
    <ImArrowUp
      onClick={() => handleVote('upvote')}
      size={30}
      style={{ color: ExistingVoteType === 'upvote' ? 'var(--clickable-color)' : 'var(--quaternary-color)',opacity: ExistingVoteType === 'upvote' ? '0.8' : '0.4' }}
    />
  );
}

export default UpVote;
