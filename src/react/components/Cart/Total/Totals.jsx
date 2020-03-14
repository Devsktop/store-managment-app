/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';

const Totals = () => {
  const { dolar, bolivar } = useSelector(state => state.cart.totals);
  console.log('renderizé totals');

  return (
    <div className="totals">
      <span>Total $: {dolar}$</span>
      <span>Total Bs.S: {bolivar}Bs.S</span>
    </div>
  );
};

export default Totals;
