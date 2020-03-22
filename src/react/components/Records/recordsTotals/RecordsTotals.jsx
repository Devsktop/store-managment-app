/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

const RecordsTotals = () => {
  const { total, netTotal } = useSelector(state => state.saleRecords);
  const { exchange } = useSelector(state => state.cart);

  return (
    <div className="records-totals">
      <div className="records-totals-panel">
        <p>Ganancia total $: {total}</p>
        <p>Ganancia total Bs.S: {total * exchange}</p>
      </div>
      <div className="records-totals-panel">
        <p>Ganancia neta $: {netTotal}</p>
        <p>Ganancia neta Bs.S: {netTotal * exchange}</p>
      </div>
    </div>
  );
};

export default RecordsTotals;
