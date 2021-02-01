import React from 'react';
import Axios from 'axios';
import { StateContext } from '../../App';
import { apiUrl } from '../../config';
import { addCommentsPost, updateStatus } from '../../reducer';

import Card from 'react-bootstrap/Card';

export default function FullPost({ match }) {
  const [state, dispatch] = React.useContext(StateContext);
  const [post, setPost] = React.useState([]);
  const [comments, setComments] = React.useState([]);

  const id = match.params.id;

  const fetchPost = async () => {
    try {
      dispatch(updateStatus('loadPost', 'loading'));
      const { data } = await Axios.get(`${apiUrl}/posts/${id}`);
      setPost(data);
      dispatch(updateStatus('loadPost', 'loaded'));
    } catch (error) {
      dispatch(updateStatus('loadPost', 'failed'));
      alert('Возникла ошибка');
    }
  };

  const fetchComments = async () => {
    try {
      dispatch(updateStatus('loadСommentsPost', 'loading'));
      const { data } = await Axios.get(`${apiUrl}/posts/${id}/comments`);
      setComments(data);
      dispatch(addCommentsPost(id, data));
      dispatch(updateStatus('loadСommentsPost', 'loaded'));
    } catch (error) {
      dispatch(updateStatus('loadСommentsPost', 'failed'));
      alert('Возникла ошибка');
    }
  };

  React.useEffect(() => {
    const _post = state.posts.length ? state.posts.filter((post) => post.id === id)[0] : {};
    if (Object.keys(_post).length !== 0) {
      setPost(_post);
    } else {
      fetchPost();
    }

    if (typeof state.commentsPost[id] !== 'undefined') {
      setComments(state.commentsPost[id]);
    } else {
      fetchComments();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="m-3">
      {state.statuses.loadPost === 'loading' && 'Loading...'}

      {post.length !== 0 && (
        <Card className="mb-3">
          <Card.Img variant="top" src={post.image} />
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.text}</Card.Text>
          </Card.Body>
        </Card>
      )}
      <h3 className="pt-3">Комментарии:</h3>
      {state.statuses.loadСommentsPost === 'loading' && 'Loading...'}
      {state.statuses.loadСommentsPost === 'loaded' &&
        comments.map((comment) => (
          <Card key={comment.id} className="mb-3">
            <Card.Body>
              <Card.Subtitle>{comment.name}</Card.Subtitle>
              <Card.Text>{comment.text}</Card.Text>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
