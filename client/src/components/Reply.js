import {Card, Image, Row, Col, Toast } from 'react-bootstrap';
import './Reply.scss'
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';
import { useEffect, useState } from 'react';
import DeleteButton from './buttons/DeleteButton';

function Reply(props){
    const [votes, setVotes] = useState(props.votes);
    const [ExistingVoteType, setExistingVoteType] = useState(props.ExistingVoteType);
    const [deleted, setDeleted] = useState(false);
    const [showToast, setShowToast] = useState(false);

    function handleVote(voteType) {
        const data = {
            voteon : 'reply',
            vote_type: voteType,
            replyid: props.replyid,};
          
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

const handleDelete = () => {setDeleted(true); setShowToast(true); props.handleDeleteReply();}

    return(
        deleted ?( <div className="toast-container">
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
          <strong className="me-auto">reply deleted</strong>
        </Toast.Header>
        <Toast.Body style={{ backgroundColor: 'var(--primary-color)'}}>Your reply has been deleted.</Toast.Body>
      </Toast> </div>) 
      
      :
        <div id="reply-container">
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={10}>
                    <Card style={{ backgroundColor: 'var(--secondary-color)'}}>
                        <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}>
                        <span id="date">{props.date}</span> <span id="user-info">{props.username}<Image id="pfp"src={props.pfp} /></span>
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
                        {props.isCreator && 
                        <Card.Footer style={{ color: 'var(--tertiary-color)' }}>
                        <DeleteButton keyword="reply" replyid={props.replyid} handleDelete={handleDelete}/>
                        </Card.Footer>
                        }
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Reply;

