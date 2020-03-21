import { fetchSaleRecords } from 'react/redux/actions/saleRecordsActions';
import { fetchProducts } from 'react/redux/actions/stockActions';
import { fetchUsers } from 'react/redux/actions/usersActions';

export const IS_LOGIN = 'IS_LOGIN';

const isLogin = () => ({
  type: IS_LOGIN
});

export const CORRECT_LOG = 'CORRECT_LOG';

const correctLog = admin => ({
  type: CORRECT_LOG,
  payload: { admin }
});

export const BAD_LOG = 'BAD_LOG';

const badLog = () => ({
  type: BAD_LOG
});

export function login({ user, pass }) {
  return dispatch => {
    dispatch(isLogin());
    // HACER FETCH A LA BDD
    const config = {
      method: 'POST',
      body: JSON.stringify({ userN: user, pass }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    return fetch('http://localhost:3500/api/tasks/Login', config)
      .then(res => res.json())
      .then(({ userdata }) => {
        if (userdata.resp) dispatch(badLog());
        else if (userdata.Admin) {
          dispatch(correctLog(userdata.Admin));
        }
      });
  };
}

export const RESET_ATTEMPTS = 'RESET_ATTEMPTS';

export const resetAttempts = () => ({
  type: RESET_ATTEMPTS
});

export const DATA_LOADED = 'DATA_LOADED';

const dataLoadedAction = () => ({
  type: DATA_LOADED
});

export function fetchData() {
  return dispatch => {
    // HACER FETCH A LA BDD
    return new Promise(resolve => setTimeout(resolve, 0)).then(async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchSaleRecords(new Date(), new Date()));
      await dispatch(fetchUsers());
      await dispatch(dataLoadedAction());
    });
  };
}

export const LOG_OUT = 'LOG_OUT';

export function logOut() {
  return dispatch => {
    dispatch({ type: 'CLEAN_FIELDS' });
    dispatch({ type: 'LOGOUT_SALE_RECORDS' });
    dispatch({ type: 'LOGOUT_STOCK' });
    dispatch({ type: 'LOGOUT_USER' });
    dispatch({ type: 'LOG_OUT' });
  };
}

// Call type: CLEAN_FIELDS to logout cart
// Call type: LOGOUT_SALE_RECORDS to logout sale records
// Call type: LOGOUT_STOCK to logout stock
