import {Card, Image} from 'react-bootstrap';
import './Reply.scss'

function Reply(props){
    return(
        <div id="reply-container">
        <Card style={{ backgroundColor: 'var(--secondary-color)'}}>
        <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}>
      <span id="date"> {props.date}</span> <span id="user-info">{props.username}<Image id="pfp"src={props.pfp} /></span>
        </Card.Header>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
            <div className="d-flex">
            <div className="mr-3 d-flex flex-column align-items-center">
            </div>
            <div id="content">{props.content}</div>
            </div>
        </Card.Body>
        <Card.Footer style={{ color: 'var(--tertiary-color)'}}>
        </Card.Footer>
        </Card>
        </div>
    )
}

export default Reply;

