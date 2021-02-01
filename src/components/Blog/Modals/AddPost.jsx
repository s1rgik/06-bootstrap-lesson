import React from 'react';
import Axios from 'axios';
import { StateContext } from '../../../App';
import { apiUrl, blog as configBlog } from '../../../config';
import { closeModal, updateStatus, addPosts, deletePost } from '../../../reducer';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function AddPost() {
  const [state, dispatch] = React.useContext(StateContext);
  const [post, setPost] = React.useState({
    title: '',
    text: '',
    image: '',
  });

  const handleAdd = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateStatus('addPost', 'save'));
      const { data } = await Axios.post(`${apiUrl}/posts`, post);
      dispatch(addPosts(data, 'before'));
      if (configBlog.quantityPostsInPage * state.navigations.shortPosts < state.posts.length + 1) {
        dispatch(deletePost(state.posts[state.posts.length - 1].id));
        dispatch(updateStatus('loadShortPosts', 'loaded'));
      }
      dispatch(updateStatus('addPost', 'saved'));
      handleClose();
      setPost({
        title: '',
        text: '',
        image: '',
      });
    } catch (error) {
      dispatch(updateStatus('addPost', 'failed'));
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
    dispatch(closeModal('addPost'));
  };

  return (
    <Modal show={state.modals.addPost.status} onHide={handleClose}>
      <Form onSubmit={handleAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add post</Modal.Title>
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
          <Button variant="primary" type="submit" disabled={state.statuses.addPost === 'save'}>
            {state.statuses.addPost === 'save' ? 'Adding...' : 'Add Post'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
