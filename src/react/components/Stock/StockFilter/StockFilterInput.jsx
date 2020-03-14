/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productFilter } from 'react/redux/actions/stockActions';

const StockFilterInput = () => {
  const dispatch = useDispatch();
  const value = useSelector(state => state.stock.productFilter);

  useEffect(() => {
    dispatch(productFilter(''));
  }, []);

  const handleChange = e => {
    if (!(value.length === 0 && e.target.value.endsWith(' ')))
      dispatch(productFilter(e.target.value));
  };

  return (
    <div className="stock-filter-input">
      <label>Filtrar por nombre: </label>
      <input type="text" onChange={handleChange} value={value} />
    </div>
  );
};

export default StockFilterInput;
