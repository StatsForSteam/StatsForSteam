import {Card, Image} from 'react-bootstrap';
import '../index.scss';
import {ImArrowUp, ImArrowDown} from 'react-icons/im';
import {MdExpandMore} from 'react-icons/md';
import './Post.scss'
import { useState } from 'react';

function Post(props) {
    return (
      <Card style={{ backgroundColor: 'var(--secondary-color)' }}>
        <Card.Header as="h5" style={{ color: 'var(--tertiary-color)' }}>
          {props.title} <span id="user-info">{props.username}<Image id="pfp"src={props.pfp} /></span>
        </Card.Header>
        <Card.Body style={{ color: 'var(--quaternary-color)' }}>
          <div className="d-flex">
            <div className="mr-3 d-flex flex-column align-items-center">
              <ImArrowUp size={30} />
              <ImArrowDown size={30} />
            </div>
            <div id="content">{props.content}</div>
          </div>
        </Card.Body>
        <Card.Footer style={{ color: 'var(--tertiary-color)' }}>
        Reply <MdExpandMore size={30} /> 
        </Card.Footer>
      </Card>
    )
}

export default Post;
