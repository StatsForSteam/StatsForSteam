import {Form} from 'react-bootstrap';
import { useState } from 'react';
import './CreateReply.scss';
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
        <div className = "reply-form">
        <Form onSubmit={handleSubmit} className="custom-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control
          as="textarea"
          placeholder="Add a reply..."
          rows={2}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Form.Group>
        <button id="reply-button" type="submit">
        reply
        </button>
        </Form>
        </div>
    )
}

export default CreateReply;
