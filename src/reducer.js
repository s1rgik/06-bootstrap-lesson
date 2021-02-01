const OPEN_MODAL = 'OPEN-MODAL';
const CLOSE_MODAL = 'CLOSE-MODAL';
const UPDATE_STATUS = 'UPDATE-STATUS';
const ADD_POST = 'ADD-POST';
const EDIT_POST = 'EDIT-POST';
const DELETE_POST = 'DELETE-POST';
const UPDATE_NAVIGATIONS = 'UPDATE-NAVIGATIONS';
const ADD_COMMENTS = 'ADD-COMMENTS';

export const initialState = {
  modals: {
    editPost: { status: false, data: [] },
    addPost: { status: false, data: [] },
    deletePost: { status: false, data: [] },
  },
  posts: [],
  commentsPost: [],
  navigations: {
    shortPosts: 1,
  },
  statuses: {
    loadShortPosts: '',
    editPost: '',
    loadСommentsPost: '',
    loadPost: '',
  },
};

export const openModal = (name, data = []) => ({
  type: OPEN_MODAL,
  payload: { name, data },
});

const _openModal = (state, payload) => {
  return {
    ...state,
    modals: {
      ...state.modals,
      [payload.name]: {
        status: true,
        data: payload.data,
      },
    },
  };
};

export const closeModal = (name, data) => ({
  type: CLOSE_MODAL,
  payload: { name, data },
});

const _closeModal = (state, payload) => {
  return {
    ...state,
    modals: {
      ...state.modals,
      [payload.name]: {
        status: false,
        data: [],
      },
    },
  };
};

export const updateStatus = (name, status) => ({
  type: UPDATE_STATUS,
  payload: { name, status },
});

const _updateStatus = (state, payload) => {
  return {
    ...state,
    statuses: {
      ...state.statuses,
      [payload.name]: payload.status,
    },
  };
};

export const updateNavigations = (name, page) => ({
  type: UPDATE_NAVIGATIONS,
  payload: { name, page },
});

const _updateNavigations = (state, payload) => {
  return {
    ...state,
    navigations: {
      ...state.navigations,
      [payload.name]: payload.page,
    },
  };
};

export const addPosts = (posts, point = 'after') => {
  let _posts = Array.isArray(posts) ? posts : [posts];

  return {
    type: ADD_POST,
    payload: { posts: _posts, point },
  };
};

const _addPost = (state, payload) => {
  if (payload.point === 'before') {
    return {
      ...state,
      posts: [...payload.posts, ...state.posts],
    };
  } else if (payload.point === 'after') {
    return {
      ...state,
      posts: [...state.posts, ...payload.posts],
    };
  }
};

export const editPost = (post) => ({
  type: EDIT_POST,
  payload: post,
});

const _editPost = (state, payload) => {
  return {
    ...state,
    posts: state.posts.map((post) => {
      if (post.id === payload.id) return { ...post, ...payload };
      return post;
    }),
  };
};

export const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
});

const _deletePost = (state, payload) => {
  return {
    ...state,
    posts: state.posts.filter((post) => post.id !== payload),
  };
};

export const addCommentsPost = (idPost, comments) => {
  let _comments = Array.isArray(comments) ? comments : [comments];
  return {
    type: ADD_COMMENTS,
    payload: { idPost, comments: _comments },
  };
};

const _addCommentsPost = (state, payload) => {
  return {
    ...state,
    commentsPost: { ...state.commentsPost, [payload.idPost]: payload.comments },
  };
};

export function reducer(state, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return _openModal(state, action.payload);

    case CLOSE_MODAL:
      return _closeModal(state, action.payload);

    case UPDATE_STATUS:
      return _updateStatus(state, action.payload);

    case ADD_POST:
      return _addPost(state, action.payload);

    case EDIT_POST:
      return _editPost(state, action.payload);

    case DELETE_POST:
      return _deletePost(state, action.payload);

    case UPDATE_NAVIGATIONS:
      return _updateNavigations(state, action.payload);

    case ADD_COMMENTS:
      return _addCommentsPost(state, action.payload);

    default:
      return state;
  }
}
