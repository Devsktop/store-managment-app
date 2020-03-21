import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'react-pulpo';

import { selectSaleRecord } from 'react/redux/actions/saleRecordsActions';

const RecordsTable = () => {
  const dispatch = useDispatch();
  const recordsO = useSelector(state => state.saleRecords.records);
  const records = Object.keys(recordsO).map(key => ({
    codigo: recordsO[key].id,
    ...recordsO[key]
  }));

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
