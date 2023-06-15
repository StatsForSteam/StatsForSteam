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
                <Col xs={10} md={10} lg={10}>
                  <Card style={{ backgroundColor: 'var(--secondary-color)' }}>
                    <Card.Header as="div" style={{ backgroundColor: 'var(--secondary-color)',color: 'var(--tertiary-color)' }}>
                      <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center">
                          <span id="username">{props.username}</span>
                          <Image id="pfp" src={props.pfp} />
                        </div>
                      </div>
                    </Card.Header>

                    <Card.Body style={{ color: 'var(--quaternary-color)' }}>
                      <div className="d-flex">
                        {props.content}
                      </div>
                    </Card.Body>

                    <Card.Footer style={{ color: 'var(--tertiary-color)', borderTop: 'none'}} >
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <UpVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
                          <span id="votes">{votes}</span>
                          <DownVote handleVote={handleVote} ExistingVoteType={ExistingVoteType} />
                        </div>
                        <div className="d-flex align-items-center">
                          <span id="date">{props.date}</span>
                          {props.isCreator && <DeleteButton keyword="reply" replyid={props.replyid} handleDelete={handleDelete}/>}
                        </div>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Reply;

