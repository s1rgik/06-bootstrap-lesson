import React from 'react';
import { StateContext } from '../../App';
import { openModal } from '../../reducer';
import { NavLink } from 'react-router-dom';

import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import { BsPencil, BsTrash } from 'react-icons/bs';

export default function ListPosts({ posts }) {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(StateContext);

  return (
    <Row className="listPosts">
      {posts.map((post) => (
        <div key={post.id} className="listPosts__item">
          <Card className="shortPost w-100">
            <Card.Img variant="top" src={post.image} />
            <Card.Body>
              <div className="shortPost__boxTitle">
                <Card.Title className="shortPost__title">{post.title}</Card.Title>
                <div className="shortPost__boxIcons">
                  <BsPencil
                    size={16}
                    className="shortPost__icon"
                    onClick={() => dispatch(openModal('editPost', post))}
                  />
                  <BsTrash
                    size={16}
                    className="shortPost__icon shortPost__icon--trash"
                    onClick={() => dispatch(openModal('deletePost', post))}
                  />
                </div>
              </div>
              <Card.Text>{post.text}</Card.Text>
              <Nav.Link as={NavLink} to={`/post/${post.id}`} className="p-0">
                Continue readings
              </Nav.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Row>
  );
}
