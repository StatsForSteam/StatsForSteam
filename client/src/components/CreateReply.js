import {Form, Button} from 'react-bootstrap';
import { useState } from 'react';

function CreateReply(props){
    const [content, setContent] = useState('');
    const {postid} = props;


    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('/createReply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({content, postid})
        });

        console.log(response)
        if (response.status === 200) {
            console.log("Reply created successfully!");
            window.location.reload();
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Reply</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter reply here"
          rows={3}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Form.Group>
        <Button variant="primary" type="submit">
        Post
        </Button>
        </Form>
    )
}

export default CreateReply;