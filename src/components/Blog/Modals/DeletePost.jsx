import React from 'react';
import Axios from 'axios';
import { StateContext } from '../../../App';
import { apiUrl, blog as configBlog } from '../../../config';
import {
  closeModal,
  updateStatus,
  deletePost,
  addPosts,
  updateNavigations,
} from '../../../reducer';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DeletePost() {
  const [state, dispatch] = React.useContext(StateContext);

  const handleDelete = async () => {
    try {
      dispatch(updateStatus('deletePost', 'deletion'));

      await Axios.delete(`${apiUrl}/posts/${state.modals.deletePost.data.id}`);

      dispatch(deletePost(state.modals.deletePost.data.id));

      const { data } = await Axios.get(
        `${apiUrl}/posts?sortBy=id&order=desc&limit=1&page=${
          state.navigations.shortPosts * configBlog.quantityPostsInPage
        }`,
      );

      dispatch(addPosts(data, 'after'));

      if (!data.length) {
        dispatch(
          updateNavigations(
            'shortPosts',
            Math.ceil((state.posts.length - 1) / configBlog.quantityPostsInPage),
          ),
        );

        dispatch(updateStatus('loadShortPosts', 'max'));
      }

      dispatch(updateStatus('deletePost', 'deleted'));
      handleClose();
    } catch (error) {
      dispatch(updateStatus('deletePost', 'failed'));
      alert('Ошибка при получении статей');
    }
  };

  const handleClose = () => {
    dispatch(closeModal('deletePost'));
  };

  return (
    <Modal show={state.modals.deletePost.status} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm delete</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        Do you really want to delete the post: "<b>{state.modals.deletePost.data.title}</b>"?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={state.statuses.deletePost === 'deletion'}>
          {state.statuses.deletePost === 'deletion' ? 'Deletion...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
