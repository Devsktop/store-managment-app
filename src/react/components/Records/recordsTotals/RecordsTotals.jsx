/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

// Redux
import { useSelector } from 'react-redux';

const RecordsTotals = () => {
  const {
    totalProfitDolar,
    netProfitDolar,
    totalProfitBolivar,
    netProfitBolivar
  } = useSelector(state => state.saleRecords.profits);

  return (
    <div className="records-totals">
      <div className="records-totals-panel">
        <p>Ganancia total $: {totalProfitDolar}</p>
        <p>Ganancia total Bs.S: {totalProfitBolivar}</p>
      </div>
      <div className="records-totals-panel">
        <p>Ganancia neta $: {totalProfitDolar - netProfitDolar}</p>
        <p>Ganancia neta Bs.S: {totalProfitBolivar - netProfitBolivar}</p>
      </div>
    </div>
  );
};

export default RecordsTotals;
