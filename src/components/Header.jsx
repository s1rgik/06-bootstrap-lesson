import React from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';
import { StateContext } from '../App';
import { openModal } from '../reducer';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default function Header() {
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = React.useContext(StateContext);

  const history = useHistory();
  const inputSearch = React.useRef();
  const [inputValue, setInputValue] = React.useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    history.push({
      pathname: '/search',
      search: `?q=${inputValue}`,
    });

    setInputValue('');
    inputSearch.current.blur();
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand as={NavLink} exact to="/">
        REACT-BLOG
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} exact to="/">
          Home
        </Nav.Link>
        <Nav.Link as={NavLink} to="/about">
          About me
        </Nav.Link>
        <Nav.Link onClick={() => dispatch(openModal('addPost'))}>Add post</Nav.Link>
      </Nav>
      <Form inline onSubmit={handleFormSubmit}>
        <FormControl
          type="text"
          placeholder="Search..."
          className="mr-sm-2"
          ref={inputSearch}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          required
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </Navbar>
  );
}
