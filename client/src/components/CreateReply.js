import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './CreateReply.scss';

function CreateReply(props) {
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { postid } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (content) {
      try {
        const response = await fetch('/createReply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, postid })
        });
          const data = await response.json();
          props.handleCreateReply(data);
         
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="reply-form">
      <Form onSubmit={handleSubmit} className="custom-form">
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            placeholder="Add a reply..."
            rows={2}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            isInvalid={isSubmitted && !content}
          />
          <Form.Control.Feedback type="invalid">
            Please enter content.
          </Form.Control.Feedback>
        </Form.Group>
        <button id="reply-button" type="submit">
          reply
        </button>
      </Form>
    </div>
  );
}

export default CreateReply;

