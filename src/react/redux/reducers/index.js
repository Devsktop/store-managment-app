import { combineReducers } from 'redux';
import cart from './cartReducer';
import stock from './stockReducer';
import saleRecords from './saleRecordsReducer';
import login from './loginReducer';
import users from './usersReducer';

export default combineReducers({ cart, stock, saleRecords, login, users });
