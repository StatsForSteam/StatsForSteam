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
  const [votes, setVotes] = useState(props.votes);
  const [ExistingVoteType, setExistingVoteType] = useState(props.ExistingVoteType);
  const [showReplyForm, setShowReply] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  function handleVote(voteType) {
    const data = {
      voteon : 'post',
      vote_type: voteType,
      postid: props.postid,}
                            
    if(ExistingVoteType === 'none'){
        if (voteType === 'upvote') {
          setVotes(votes + 1);
          setExistingVoteType('upvote');
        }
        if (voteType === 'downvote') {
          setVotes(votes - 1);
          setExistingVoteType('downvote');
        }
        fetch('/createVote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
      }

    else if(!(ExistingVoteType === voteType)){
      if (voteType === 'upvote') {
        setVotes(votes + 2);
        setExistingVoteType('upvote');
      }
      if (voteType === 'downvote') {
        setVotes(votes - 2);
        setExistingVoteType('downvote');
      }
 
      fetch('/updateVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
    }

    else if(ExistingVoteType === voteType){
      if (voteType === 'upvote') {
        setVotes(votes - 1);
        setExistingVoteType('none');
      }
      if (voteType === 'downvote') {
        setVotes(votes + 1);
        setExistingVoteType('none');
      }

      fetch('/deleteVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }) 
    }
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
            <UpVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
            <span id="votes">{votes}</span>
            <DownVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
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
        {showReplyForm && <CreateReply postid={props.postid}/>}
      {showReplies && <>{props.replies}</>}
        </div>
    </div>

    )
}

export default Post;


