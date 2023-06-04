import { ImArrowDown } from 'react-icons/im';

function DownVote({ handleVote, ExistingVoteType }) {
  return (
    <ImArrowDown
      onClick={() => handleVote('downvote')}
      size={30}
      style={{ color: ExistingVoteType === 'downvote' ? 'red' : null }}
    />
  );
}

export default DownVote;
