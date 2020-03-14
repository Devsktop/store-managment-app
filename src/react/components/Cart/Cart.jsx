import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';

// components
import AddToCart from './AddToCart/AddToCart';
import DataTable from './DataTable/DataTableH';
import Totals from './Total/Totals';
import Description from './Description/Descrption';
import ButtonPanel from './ButtonPanel/ButtonPanel';

const Cart = () => {
  const { state } = useLocation();

  if (!state) return <Redirect to="/" />;

  return (
    <div className="container">
      <AddToCart />
      <DataTable />
      <Totals />
      <Description />
      <ButtonPanel />
    </div>
  );
};

export default Cart;
