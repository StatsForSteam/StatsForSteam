import { ImArrowDown } from 'react-icons/im';

function DownVote({ handleVote, voteType }) {
  return (
    <ImArrowDown
      onClick={() => handleVote('downvote')}
      size={30}
      style={{ color: voteType === 'downvote' ? 'red' : null }}
    />
  );
}

export default DownVote;