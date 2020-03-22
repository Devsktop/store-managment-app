import {
  ADD_SALE_RECORD,
  SELECT_SALE_RECORD,
  FETCH_SALE_RECORDS,
  LOGOUT_SALE_RECORDS
} from '../actions/saleRecordsActions';

const initialState = {
  records: {},
  currentRecord: [],
  profits: {
    totalProfitDolar: 0,
    netProfitDolar: 0,
    totalProfitBolivar: 0,
    netProfitBolivar: 0
  }
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_SALE_RECORD: {
      const recordId = payload.id;

      const records = {
        ...state.records,
        [recordId]: { ...payload.record, id: recordId }
      };

      // extracting profits
      const { dolar, bolivar, profitDolar, profitBolivar } = payload.profits;

      // Create object and Acumulating profits values
      const profits = {
        totalProfitDolar: state.profits.totalProfitDolar + dolar,
        netProfitDolar: state.profits.netProfitDolar + profitDolar,
        totalProfitBolivar: state.profits.totalProfitBolivar + bolivar,
        netProfitBolivar: state.profits.netProfitBolivar + profitBolivar
      };

      return {
        ...state,
        records,
        profits
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
        records: payload.records
      };

    case LOGOUT_SALE_RECORDS:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
