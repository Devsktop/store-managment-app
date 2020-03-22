import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'react-pulpo';

import { selectSaleRecord } from 'react/redux/actions/saleRecordsActions';

const RecordsTable = () => {
  const dispatch = useDispatch();
  const { exchange } = useSelector(state => state.cart);
  const recordsO = useSelector(state => state.saleRecords.records);
  const records = Object.keys(recordsO)
    .map(key => {
      const { date, dolar, paymentMethod, observations, id } = recordsO[key];

      return {
        codigo: id,
        date,
        dolar,
        bolivar: dolar * exchange,
        paymentMethod,
        observations,
        id
      };
    })
    .reverse();

  const onClickRow = rowId => {
    dispatch(selectSaleRecord(rowId));
  };

  useEffect(() => {
    return () => {
      onClickRow(null);
    };
  }, []);

  return (
    <DataTable
      data={records}
      properties={[
        'Código',
        'Fecha',
        'Total $',
        'Total BsS',
        'Método',
        'Observaciones'
      ]}
      onClickRow={onClickRow}
    />
  );
};

export default RecordsTable;
