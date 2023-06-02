import {Card} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function Post(props) {
    return (
        <div>
            <Card>
                <Card.Header>{props.title}</Card.Header>
                <Card.Header>{props.username}</Card.Header>
                <Card.Body>
                   {props.content}
                    <Image fluid="true" src={props.pfp}></Image> 
                </Card.Body>
            </Card>
        </div>
    )
}

export default Post;
