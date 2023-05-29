import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../index.scss';

function CreatePost({ hidePosts }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content
        })
      });

      // Handle the response as needed
      console.log(response)
      if (response.status === 204) {
       console.log("Post created successfully!");
        hidePosts();
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <Form className="form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Enter a title for your post"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Enter post content"
          rows={3}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
}

export default CreatePost;
