import React from 'react';
import StockFilterSelect from './StockFilterSelect';
import StockFilterInput from './StockFilterInput';

const StockFilter = () => {
  return (
    <div className="stock-filter">
      <StockFilterSelect />
      <StockFilterInput />
    </div>
  );
};

export default StockFilter;
