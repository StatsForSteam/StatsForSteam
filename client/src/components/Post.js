import {Card, Image, Toast} from 'react-bootstrap';
import '../index.scss';
import './Post.scss'
import {useState, useEffect} from 'react';
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
  const [tag] = useState(() => {
    return props.tags.find(tag => tag.id === props.tagid);
  });
  

    



    //tags.find(tag => tag.name === selectedTagName);
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
        fetch('http://127.0.0.1:8000/api/createVote', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data),
          credentials: 'include',
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
 
      fetch('http://127.0.0.1:8000/api/updateVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
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

      fetch('http://127.0.0.1:8000/api/deleteVote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include',
      }) 
    }
  }
  
  function handleCreateReply(data) {
    setShowReplyForm(!showReplyForm);
    const newReply = {
      replyid: data[0],
      content: data[1],
      date: data[2],
      username: data[3],
      pfp: data[4],
      votes: 0,
      is_creator: true,
      ExistingVoteType: 'none',
    };
    setReplies((prevReplies) => [newReply, ...prevReplies]);
    setNumReplies((prevNumReplies) => prevNumReplies + 1);
  }



  const handleSeeReplies = () => {setShowReplies(!showReplies);};
  const handleShowReplyForm = () => {setShowReplyForm(!showReplyForm);};
  const handleDelete = () => { setDeleted(true); setShowToast(true);} 
  const handleDeleteReply = () => {setNumReplies(numReplies -1)}

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
        
      {tag.name!= "None" ? <Card.Header as="div" style={{ backgroundColor: 'var(--secondary-color)', borderBottom:'none'}}>
          <div className="d-flex align-items-center justify-content-between">
            <div className={`badge-tag ${tag.color}`}>
            {tag.name}
            </div>
          </div>
        </Card.Header> : null}

        <Card.Header as="div" style={{ backgroundColor: 'var(--secondary-color)',color: 'var(--tertiary-color)' }}>
          <div className="d-flex align-items-center justify-content-between">
            <div>
            <h5>{props.title}</h5>
            </div>
            <div className="d-flex align-items-center">
              <span id="username">{props.username}</span>
              <Image id="pfp" src={props.pfp} />
            </div>
          </div>
        </Card.Header>

      <Card.Body style={{ color: 'var(--quaternary-color)' }}>
        <div className="d-flex">
          <div className="mr-3 d-flex flex-column align-items-center">
          <UpVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
            {votes}
          <DownVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
          </div>
          <div id="content">{props.content}</div>
        </div>
      </Card.Body>

      <Card.Footer style={{ color: 'var(--tertiary-color)' }}>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <SeeRepliesButton showReplies={showReplies} numReplies={numReplies} postid={props.postid} handleSeeReplies={handleSeeReplies} />
            <CreateReplyButton handleShowReplyForm={handleShowReplyForm} />
          </div>
          <div>
            <span id="date">{props.date}</span>
            {props.isCreator && <DeleteButton keyword="post" postid={props.postid} handleDelete={handleDelete} />}
          </div>
        </div>
      </Card.Footer>
    </Card>
    <div>
        {showReplyForm && <CreateReply handleCreateReply={handleCreateReply} postid={props.postid}/>}
        {showReplies && replies.map((reply) => (
  <Reply
    key={reply.replyid}
    replyid={reply.replyid}
    content={reply.content}
    username={reply.username}
    pfp={reply.pfp}
    date={reply.date}
    votes={reply.votes}
    ExistingVoteType={reply.existing_vote_type}
    isCreator={reply.is_creator}
    handleDeleteReply={handleDeleteReply}
  />
))}
        </div> 
    </div> )

    )
}

export default Post;


