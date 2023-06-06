import {Card, Image} from 'react-bootstrap';
import '../index.scss';
import './Post.scss'
import { useState } from 'react';
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';
import CreateReplyButton from './buttons/CreateReplyButton';
import CreateReply from './CreateReply';
import SeeRepliesButton from './buttons/SeeRepliesButton';
import Reply from './Reply';

function Post(props) {
  const [votes, setVotes] = useState(props.votes);
  const [ExistingVoteType, setExistingVoteType] = useState(props.ExistingVoteType);
  const [replies, setReplies] = useState(props.replies);
  const [numReplies, setNumReplies] = useState(props.numReplies);
  const [showReplyForm, setShowReplyForm] = useState(false);
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
  
  function handleShowReplyForm(){
    setShowReplyForm(!showReplyForm);
  }

  function handleCreateReply(data) {
    setShowReplyForm(!showReplyForm);
    const newReply = (
      <Reply
        key={data[0]}
        replyid={data[0]}
        content={data[1]}
        date={data[2]}
        username={data[3]}
        pfp={data[4]}
        votes={0}
        ExistingVoteType={'none'}
      />
    );
    setReplies(prevState => [newReply, ...prevState]);
    setNumReplies(numReplies + 1);
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
      <SeeRepliesButton showReplies={showReplies} numReplies= {numReplies} postid = {props.postid} handleSeeReplies={handleSeeReplies}/>
     <CreateReplyButton handleShowReplyForm={handleShowReplyForm}/> 
      </Card.Footer> 
      </Card>
        <div>
        {showReplyForm && <CreateReply handleCreateReply={handleCreateReply} postid={props.postid}/>}
      {showReplies && <>{replies}</>}
        </div>
    </div>

    )
}

export default Post;


