import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../index.scss';
import './CreatePost.scss';

function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    if (title && content) {
      const response = await fetch('/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          appid: props.appid
        })
      });
      const data = await response.json();
      props.hideCreateForm();
      props.onNewPost(data);
    }
  };
  
  return (
    <div id="createpost-container">
      <Form autoComplete="off" className="createpost-form" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label id="label">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Add a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            isInvalid={isSubmitted && !title}
          />
          <Form.Control.Feedback type="invalid">
            Please enter a title.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label id="label">Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Add content"
            rows={2}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            isInvalid={isSubmitted && !content}
          />
          <Form.Control.Feedback type="invalid">
            Please enter content.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" id="post-button">
          Post
        </Button>
      </Form>
    </div>
  );
}

export default CreatePost;




