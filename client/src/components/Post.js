import {Card, Image} from 'react-bootstrap';
import '../index.scss';
import './Post.scss'
import { useState } from 'react';
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';
import CreateReplyButton from './buttons/CreateReplyButton';
import CreateReply from './CreateReply';
import SeeRepliesButton from './buttons/SeeRepliesButton';

function Post(props) {
  const [votes, setVotes] = useState(0);
  const [voteType, setVoteType] = useState('');
  const [showReplyForm, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  function handleVote(voteType) {
    const updatedVotes = voteType === 'upvote' ? votes + 1 : votes - 1;
    setVotes(updatedVotes);
    setVoteType(voteType);
  }

  function handleCreateReply() {
    setShowReply(!showReplyForm);
  }

  function handleSeeReplies() {
    setShowReplies(!showReplies);
  }

    return (
     <div>
      <Card style={{ backgroundColor: 'var(--secondary-color)' }}>
        <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}>
          {props.title} <span id="user-info">{props.username}<Image id="pfp"src={props.pfp} /></span> <span id="date">{props.date}</span>
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
      <SeeRepliesButton showReplies={showReplies} numReplies= {props.numReplies} postid = {props.postid} handleSeeReplies={handleSeeReplies}/>
      <CreateReplyButton  handleCreateReply={handleCreateReply}/>
      </Card.Footer> 
      </Card>
        <div>
      {showReplies && <>{props.replies}</>}
        {showReplyForm && <CreateReply postid={props.postid}/>}
        </div>
    </div>

    )
}

export default Post;


