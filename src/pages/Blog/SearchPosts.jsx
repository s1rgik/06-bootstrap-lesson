import React from 'react';
import Axios from 'axios';
import { apiUrl, blog as configBlog } from '../../config';

import ListPosts from '../../components/Blog/ListPosts';

import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function SearchPosts({ history }) {
  const searchStr = new URLSearchParams(history.location.search).get('q').trim();

  const [payload, setPayload] = React.useState();
  const [posts, setPosts] = React.useState([]);
  const page = React.useRef(1);

  const fetchPosts = async () => {
    try {
      setPayload('loading');

      const { data } = await Axios.get(
        `${apiUrl}/posts?title=${searchStr}&limit=${configBlog.quantityPostsInPage}&page=${page.current}`,
      );

      setPosts((prevPosts) => [...prevPosts, ...data]);

      if (data.length < configBlog.quantityPostsInPage) {
        setPayload('max');
      } else {
        setPayload('loaded');
      }
    } catch (error) {
      console.log(error);
      alert('Ошибка при получении статей');
    }
  };

  React.useEffect(() => {
    setPosts([]);
    page.current = 1;
    if (searchStr) fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr]);

  const nextPage = () => {
    if (payload !== 'max') {
      ++page.current;
      fetchPosts();
    }
  };

  const _showButton = () => {
    if (posts.length && (payload === 'loading' || payload === 'loaded')) return true;
    return false;
  };
  const _notFound = () => {
    if (searchStr && !posts.length && (payload === 'loaded' || payload === 'max')) return true;
    return false;
  };

  return (
    <div className="shortPosts">
      <div className="shortPosts__titleSearch mt-3">
        <h3 className="mb-2">Search results for query: "{searchStr}":</h3>
        {payload === 'loading' && <div className="mt-3">Загрузка...</div>}
        {!searchStr && (
          <Alert variant="danger" className="mt-3">
            Error. An empty request was submitted.
          </Alert>
        )}
        {_notFound() && (
          <Alert variant="info" className="mt-3">
            Nothing found.
          </Alert>
        )}
      </div>
      <div className="shortPosts__posts">
        <ListPosts posts={posts} />
      </div>
      <div className="shortPosts__pagination d-flex justify-content-center mb-3 mt-3">
        {_showButton() && (
          <Button variant="primary" onClick={nextPage}>
            Load more
          </Button>
        )}
      </div>
    </div>
  );
}
