import {Card, Image, Toast} from 'react-bootstrap';
import '../index.scss';
import './Post.scss'
import { useEffect, useState } from 'react';
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';
import CreateReplyButton from './buttons/CreateReplyButton';
import CreateReply from './CreateReply';
import SeeRepliesButton from './buttons/SeeRepliesButton';
import DeleteButton from './buttons/DeleteButton';
import Reply from './Reply';

function Post(props) {
  const [votes, setVotes] = useState(props.votes);
  const [ExistingVoteType, setExistingVoteType] = useState(props.ExistingVoteType);
  const [replies, setReplies] = useState(props.replies);
  const [numReplies, setNumReplies] = useState(props.numReplies);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [showToast, setShowToast] = useState(false);

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
        isCreator={true}
        ExistingVoteType={'none'}
      />
    );
    setReplies(prevState => [newReply, ...prevState]);
    setNumReplies(numReplies + 1);
  }



  const handleSeeReplies = () => {setShowReplies(!showReplies);};
  const handleShowReplyForm = () => {setShowReplyForm(!showReplyForm);};
  const handleDelete = () => { setDeleted(true); setShowToast(true); }
  

    return (
      //When post deleted display toast
      deleted ? (
        <div className="toast-container">
        <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          minWidth: "200px",
          zIndex: 9999,
        }}
        autohide
        delay={3000}
      >
        <Toast.Header style={{ backgroundColor: 'var(--primary-color)', color:'var(--tertiary-color)', borderBottom: '2px solid var(--tertiary-color)'}} closeButton={false}>
          <strong className="me-auto">post deleted</strong>
        </Toast.Header>
        <Toast.Body style={{ backgroundColor: 'var(--primary-color)'}}>Your post has been deleted.</Toast.Body>
      </Toast> </div>) : (

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
     {props.isCreator && <DeleteButton keyword="post" postid={props.postid} handleDelete={handleDelete} />}
      </Card.Footer> 
      </Card>
        <div>
        {showReplyForm && <CreateReply handleCreateReply={handleCreateReply} postid={props.postid}/>}
      {showReplies && <>{replies}</>}
        </div> 
    </div> )

    )
}

export default Post;


