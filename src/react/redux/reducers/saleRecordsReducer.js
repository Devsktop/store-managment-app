import {
  ADD_SALE_RECORD,
  SELECT_SALE_RECORD,
  FETCH_SALE_RECORDS
} from '../actions/saleRecordsActions';

const initialState = {
  records: {},
  recordsProducts: {},
  currentRecord: [],
  profits: {
    totalProfitDolar: 0,
    netProfitDolar: 0,
    totalProfitBolivar: 0,
    netProfitBolivar: 0
  },
  recordsFilter: ''
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_SALE_RECORD: {
      // EFECTOS DE REACT, CAMBIAR CUANDO TENGA SERVIDOR
      const recordId = Object.keys(state.records).length;

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

      console.log(records);

      const recordsProducts = {
        ...state.recordsProducts,
        [recordId]: payload.recordProducts
      };

      console.log(recordsProducts);

      return {
        ...state,
        records,
        recordsProducts,
        profits
      };
    }

    case SELECT_SALE_RECORD:
      return {
        ...state,
        currentRecord: payload.id
      };

    case FETCH_SALE_RECORDS:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
}
