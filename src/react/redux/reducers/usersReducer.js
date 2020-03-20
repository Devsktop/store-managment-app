import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  FETCH_USERS,
  LOGOUT_USER
} from 'react/redux/actions/usersActions';

const initialState = {
  users: {}
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_USER: {
      const { id } = payload.user;
      const user = { ...payload.user, id };
      const users = { ...state.users, [id]: user };
      return {
        ...state,
        users
      };
    }

    case UPDATE_USER: {
      const { user } = payload;
      const users = { ...state.users, [user.id]: user };
      return {
        ...state,
        users
      };
    }

    case DELETE_USER: {
      const users = { ...state.users };
      delete users[payload.id];
      return {
        ...state,
        users
      };
    }

    case FETCH_USERS:
      return {
        users: payload.users
      };

    case LOGOUT_USER:
      return {
        users: {}
      };

    default:
      return state;
  }
}
