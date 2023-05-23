import {Card} from 'react-bootstrap';

function Post(props) {
    return (
        <div>
            <Card>
                <Card.Header>Title</Card.Header>
                <Card.Body>
                   Post content 
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post;
