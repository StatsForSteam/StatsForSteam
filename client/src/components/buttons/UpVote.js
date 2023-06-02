import { ImArrowUp } from 'react-icons/im';

function UpVote({ handleVote, voteType }) {
  return (
    <ImArrowUp
      onClick={() => handleVote('upvote')}
      size={30}
      style={{ color: voteType === 'upvote' ? 'green' : null }}
    />
  );
}

export default UpVote;