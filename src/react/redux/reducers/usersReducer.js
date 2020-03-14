import {
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER
} from 'react/redux/actions/usersActions';

const initialState = {
  users: {
    0: {
      id: 0,
      user: 'Ricardo',
      admin: 'SUPER_ADMIN'
    },
    1: {
      id: 1,
      user: 'Albani',
      admin: 'NORMAL'
    },
    2: {
      id: 2,
      user: 'Lukas',
      admin: 'NORMAL'
    }
  }
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_USER: {
      // ID DEBE VENIR EN PAYLOAD DESDE LA BDD
      const userId = Object.keys(state.users).length;
      const user = { ...payload.user, id: userId };
      const users = { ...state.users, [userId]: user };
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

    default:
      return state;
  }
}
