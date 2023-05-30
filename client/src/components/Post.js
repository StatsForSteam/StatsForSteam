import {Card} from 'react-bootstrap';

function Post(props) {
    return (
        <div>
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Body>
                   {props.content}
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post;
