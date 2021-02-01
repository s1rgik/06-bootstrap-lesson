import React from 'react';
import Axios from 'axios';
import { StateContext } from '../../../App';
import { apiUrl } from '../../../config';
import { closeModal, editPost, updateStatus } from '../../../reducer';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function EditPost() {
  const [state, dispatch] = React.useContext(StateContext);
  const [post, setPost] = React.useState({
    title: '',
    text: '',
    image: '',
  });

  React.useEffect(() => {
    setPost({
      title: state.modals.editPost.data.title ?? '',
      text: state.modals.editPost.data.text ?? '',
      image: state.modals.editPost.data.image ?? '',
    });
  }, [state.modals.editPost]);

  const handleEdit = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateStatus('editPost', 'save'));
      const { data } = await Axios.put(`${apiUrl}/posts/${state.modals.editPost.data.id}`, post);
      dispatch(editPost(data));
      dispatch(updateStatus('editPost', 'saved'));
      handleClose();
    } catch (error) {
      dispatch(updateStatus('editPost', 'failed'));
      alert('Ошибка при получении статей');
    }
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const handleClose = () => {
    dispatch(closeModal('editPost'));
  };

  return (
    <Modal show={state.modals.editPost.status} onHide={handleClose}>
      <Form onSubmit={handleEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={post.title}
              onChange={handleChangeInput}
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={post.image}
              onChange={handleChangeInput}
              required
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              name="text"
              rows={5}
              value={post.text}
              onChange={handleChangeInput}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={state.statuses.editPost === 'save'}>
            {state.statuses.editPost === 'save' ? 'Save...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
