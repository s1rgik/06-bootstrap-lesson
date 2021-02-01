import React from 'react';
import ListPosts from '../../components/Blog/ListPosts';
import Axios from 'axios';
import { StateContext } from '../../App';
import { apiUrl, blog as configBlog } from '../../config';
import { updateStatus, updateNavigations, addPosts } from '../../reducer';

import Button from 'react-bootstrap/Button';

export default function ShortPosts() {
  const [state, dispatch] = React.useContext(StateContext);

  const fetchPosts = async (page = 1) => {
    try {
      dispatch(updateStatus('loadShortPosts', 'loading'));

      const { data } = await Axios.get(
        `${apiUrl}/posts?sortBy=id&order=desc&limit=${configBlog.quantityPostsInPage}&page=${page}`,
      );

      dispatch(addPosts(data, 'after'));

      if (data.length < configBlog.quantityPostsInPage) {
        dispatch(updateStatus('loadShortPosts', 'max'));
      } else {
        dispatch(updateStatus('loadShortPosts', 'loaded'));
      }
    } catch (error) {
      dispatch(updateStatus('loadShortPosts', 'failed'));
      alert('Ошибка при получении статей');
    }
  };

  React.useEffect(() => {
    if (!state.posts.length) fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextPage = () => {
    const nextPage = state.navigations.shortPosts + 1;
    dispatch(updateNavigations('shortPosts', nextPage));
    fetchPosts(nextPage);
  };

  const _showButton = () => {
    if (
      state.posts.length &&
      (state.statuses.loadShortPosts === 'loading' || state.statuses.loadShortPosts === 'loaded')
    )
      return true;

    return false;
  };

  return (
    <div className="shortPosts">
      <div className="shortPosts__posts">
        {state.posts.length === 0 && state.statuses.loadShortPosts === 'loading' && (
          <div className="mt-3">Loading...</div>
        )}
        <ListPosts posts={state.posts} />
      </div>
      <div className="shortPosts__pagination d-flex justify-content-center mb-3 mt-3">
        {_showButton() && (
          <Button
            variant="primary"
            onClick={nextPage}
            disabled={state.statuses.loadShortPosts === 'loading'}>
            {state.statuses.loadShortPosts === 'loading' ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </div>
    </div>
  );
}
