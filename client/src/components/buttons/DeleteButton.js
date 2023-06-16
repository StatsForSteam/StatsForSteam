import { useState } from "react";
import { Modal} from "react-bootstrap";
import {MdDelete} from 'react-icons/md';
import "../../index.scss";
import './DeleteButton.scss'

function DeleteButton(props) {
  const [showModal, setShowModal] = useState(false);

  function deletePost() {
    if(props.keyword === "post"){
      fetch("http://127.0.0.1:8000/api/deletePost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postid: props.postid }),
      })
        .then(() => {
          setShowModal(false);
          props.handleDelete();
        })
    }
    else{
      fetch("http://127.0.0.1:8000/api/deleteReply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyid: props.replyid }),
      })
        .then(() => {
          setShowModal(false);
          props.handleDelete();
        })
    }
  }

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  return (
    <>
      <MdDelete onClick={handleShowModal} size={40} style={{ marginLeft: "5px" }} className="PostButton" />
      <Modal style={{ color: 'var(--tertiary-color)'}} show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header style={{ backgroundColor: 'var(--primary-color)', borderBottom: '2px solid var(--tertiary-color)'}} closeVariant='white' closeButton>
          <Modal.Title>Delete {props.keyword}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'var(--primary-color)',borderBottom: 'none'}}>
          <p>Delete your {props.keyword} permanently?</p>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: 'var(--primary-color)',borderTop: 'none'}}>
          <button className="cancel-button" onClick={handleCloseModal}>
            Cancel
          </button>
          <button className="delete-button" onClick={deletePost}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteButton;



