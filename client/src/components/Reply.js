import {Card, Image,Container, Row, Col } from 'react-bootstrap';
import './Reply.scss'
import UpVote from './buttons/UpVote';
import DownVote from './buttons/DownVote';
import { useState } from 'react';

function Reply(props){
    const [votes, setVotes] = useState(props.votes);
    const [ExistingVoteType, setExistingVoteType] = useState(props.ExistingVoteType);

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



    return(
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
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Reply;

