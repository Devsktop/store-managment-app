import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Dolar portal
import DolarPortal from 'react/components/DolarPortal';

// components
import AddToCart from './AddToCart/AddToCart';
import DataTable from './DataTable/DataTableH';
import Totals from './Total/Totals';
import Description from './Description/Descrption';
import ButtonPanel from './ButtonPanel/ButtonPanel';

const Cart = () => {
  const { state } = useLocation();
  const dolar = useSelector(rstate => rstate.cart.exchange === 0);

  if (!state) return <Redirect to="/" />;

  if (dolar) return <DolarPortal />;

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
