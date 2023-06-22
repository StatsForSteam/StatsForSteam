import React, { useState } from 'react';
import { Form, Button, FormControl, Dropdown, DropdownButton, Row, Col } from 'react-bootstrap';
import '../index.scss';
import './CreatePost.scss';

function CreatePost(props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [tags] = useState(props.tags); // tags is an array of objects with id, name, and color properties from forums.js
  const [tag, setTag] = useState(tags[0]); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    if (title.length > 45 || content.length > 255) {
      return; // Exit early if title or content exceeds the limits
    }

    if (title && content) {
      const response = await fetch('http://127.0.0.1:8000/api/createPost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          appid: props.appid,
          tagid: tag.id,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      props.hideCreateForm();
      props.onNewPost(data);
    }
  };
  
  const handleTagSelect = (event) => {
    const selectedTagName = event.target.textContent;
    const selectedTag = tags.find(tag => tag.name === selectedTagName);
    setTag(selectedTag);
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
            isInvalid={isSubmitted && (!title || title.length > 45)}
          />
          <FormControl.Feedback type="invalid">
            {isSubmitted && !title && "Please enter a title."}
            {isSubmitted && title && title.length > 45 && "Title should not exceed 45 characters."}
          </FormControl.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label id="label">Content</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Add content"
            rows={2}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            isInvalid={isSubmitted && (!content || content.length > 255)}
          />
          <FormControl.Feedback type="invalid">
            {isSubmitted && !content && "Please enter content."}
            {isSubmitted && content && content.length > 255 && "Content should not exceed 255 characters."}
          </FormControl.Feedback>
        </Form.Group>
        
      
        <div className="d-flex align-items-center">
          <Button type="submit" id="post-button">
            Post
          </Button>

          <DropdownButton
            drop="down-centered"
            title={`Tag: ${tag.name}`}
            className={`tag-dropdown ${tag.color}`}
          >
            {tags.map((tagItem) => (
              <Dropdown.Item key={tagItem.id} type="button" onClick={handleTagSelect}>
                {tagItem.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>
      
      </Form>
    </div>
  );
}

export default CreatePost;






