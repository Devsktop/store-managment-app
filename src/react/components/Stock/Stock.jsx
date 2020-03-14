import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import StockFilter from './StockFilter/StockFilter';
import ProductsTable from './ProductsTable/ProductsTable';
import StockButtonPanel from './ButtonPanel/ButtonPanel';

const Stock = () => {
  const { state } = useLocation();
  if (!state) return <Redirect to="/" />;
  return (
    <div className="container">
      <StockFilter />
      <ProductsTable />
      <StockButtonPanel />
    </div>
  );
};

export default Stock;
