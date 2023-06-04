import { ImArrowUp } from 'react-icons/im';

function UpVote({ handleVote, ExistingVoteType  }) {
  return (
    <ImArrowUp
      onClick={() => handleVote('upvote')}
      size={30}
      style={{ color: ExistingVoteType === 'upvote' ? 'green' : null }}
    />
  );
}

export default UpVote;
