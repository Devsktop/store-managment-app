import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';

// Components
import RecordsFilter from './RecordFilter/RecordsFilter';
import RecordsTable from './RecordsTable';
import ProductsTable from './ProductsTable';
import RecordsTotals from './recordsTotals/RecordsTotals';

const Records = () => {
  const { state } = useLocation();
  if (!state) return <Redirect to="/" />;

  return (
    <div className="container">
      <RecordsFilter />
      <RecordsTable />
      <ProductsTable />
      <RecordsTotals />
    </div>
  );
};

export default Records;
