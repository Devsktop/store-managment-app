import {
  ADD_SALE_RECORD,
  SELECT_SALE_RECORD,
  FETCH_SALE_RECORDS,
  LOGOUT_SALE_RECORDS,
  SET_TODAY
} from '../actions/saleRecordsActions';

const initialState = {
  records: {},
  currentRecord: [],
  total: 0,
  netTotal: 0,
  today: true
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_SALE_RECORD: {
      const recordId = payload.id;
      const records = {
        [recordId]: { ...payload.record, id: recordId },
        ...state.records
      };

      const total = state.total + payload.record.dolar;
      const netTotal = state.netTotal + payload.netTotal;
      // falta total neto

      return {
        ...state,
        records,
        total,
        netTotal
      };
    }

    case SELECT_SALE_RECORD:
      return {
        ...state,
        currentRecord: payload.record
      };

    case FETCH_SALE_RECORDS:
      return {
        ...state,
        records: payload.records,
        total: payload.total,
        netTotal: payload.netTotal
      };

    case SET_TODAY:
      return {
        ...state,
        today: payload.today
      };

    case LOGOUT_SALE_RECORDS:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
