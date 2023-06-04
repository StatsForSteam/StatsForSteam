import { useState } from 'react';
import { Form} from 'react-bootstrap';
import '../index.scss';
import './CreatePost.scss';

function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { hidePosts, appid } = props;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          appid
        })
      });

      // Handle the response as needed
      console.log(response)
      if (response.status === 204) {
       console.log("Post created successfully!");
        hidePosts();
        window.location.reload();
      }
    } catch (error) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <div id="createpost-container">
    <Form autocomplete="off" className="createpost-form" onSubmit={handleSubmit}>
      <Form.Group  className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label id="label">Title</Form.Label>
        <Form.Control
          placeholder="add a title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label id="label" >Content</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="add content"
          rows={2}
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </Form.Group>
      <button id="post-button" type="submit">
        post
        </button>
    </Form>
    </div>
  );
}

export default CreatePost;
