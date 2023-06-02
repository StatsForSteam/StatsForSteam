import {Card, Image} from 'react-bootstrap';
import '../index.scss';
import {MdExpandMore} from 'react-icons/md';
import './Post.scss'
import { useState } from 'react';
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';

function Post(props) {
  const [votes, setVotes] = useState(0);
  const [voteType, setVoteType] = useState('');

  function handleVote(voteType) {
    const updatedVotes = voteType === 'upvote' ? votes + 1 : votes - 1;
    setVotes(updatedVotes);
    setVoteType(voteType);
  }
   
    return (
      <Card style={{ backgroundColor: 'var(--secondary-color)' }}>
        <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}>
          {props.title} <span id="user-info">{props.username}<Image id="pfp"src={props.pfp} /></span>
        </Card.Header>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
          <div className="d-flex">
            <div className="mr-3 d-flex flex-column align-items-center">
            <UpVote handleVote={handleVote} voteType={voteType} />
            <span id="votes">{votes}</span>
            <DownVote handleVote={handleVote} voteType={voteType} />
            </div>
            <div id="content">{props.content}</div>
          </div>
        </Card.Body>
        <Card.Footer style={{ color: 'var(--tertiary-color)' }}>
        Reply <MdExpandMore size={30} /> 
        </Card.Footer>
      </Card>
    )
}

export default Post;


