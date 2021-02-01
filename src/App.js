import React from 'react';
import { Route } from 'react-router-dom';
import { reducer, initialState } from './reducer';

import Header from './components/Header';
import ShortPosts from './pages/Blog/ShortPosts';
import EditPost from './components/Blog/Modals/EditPost';
import AddPost from './components/Blog/Modals/AddPost';
import DeletePost from './components/Blog/Modals/DeletePost';
import SearchPosts from './pages/Blog/SearchPosts';
import FullPost from './pages/Blog/FullPost';
import AboutMe from './pages/AboutMe';

export const StateContext = React.createContext();

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      <div className="page">
        <div className="page__line page__line--head bg-dark">
          <div className="page__head container">
            <Header />
          </div>
        </div>
        <div className="page__line page__line--body">
          <div className="page__body container">
            <Route exact path="/" render={(props) => <ShortPosts {...props} />} />
            <Route path="/search" render={(props) => <SearchPosts {...props} />} />
            <Route path="/post/:id" render={(props) => <FullPost {...props} />} />
            <Route path="/about" render={(props) => <AboutMe {...props} />} />
          </div>
        </div>
        <EditPost />
        <AddPost />
        <DeletePost />
      </div>
    </StateContext.Provider>
  );
}

export default App;
