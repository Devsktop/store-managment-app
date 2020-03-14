import {
  LOG_OUT,
  IS_LOGIN,
  CORRECT_LOG,
  BAD_LOG,
  RESET_ATTEMPTS,
  DATA_LOADED
} from '../actions/loginActions';

const initialState = {
  logged: false,
  isLogin: false,
  admin: '',
  attempts: 0,
  dataLoaded: false
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case IS_LOGIN:
      return {
        ...state,
        isLogin: true
      };
    case CORRECT_LOG:
      return {
        ...state,
        isLogin: false,
        admin: payload.admin,
        logged: true
      };

    case BAD_LOG:
      return {
        ...state,
        isLogin: false,
        attempts: state.attempts + 1
      };

    case RESET_ATTEMPTS: {
      const attempts = state.attempts === 3 ? 0 : state.attempts;
      return {
        ...state,
        attempts
      };
    }

    case LOG_OUT:
      return {
        ...state,
        logged: false,
        admin: '',
        attempts: 0,
        dataLoaded: false
      };

    case DATA_LOADED:
      return {
        ...state,
        dataLoaded: true
      };
    default:
      return state;
  }
}
