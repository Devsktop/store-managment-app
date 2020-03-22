import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';

import { cleanFields } from 'react/redux/actions/cartActions';
import { addSaleRecord } from 'react/redux/actions/saleRecordsActions';

const activateButton = createSelector(
  state => state.cart.cart,
  state => state.cart.paymentMethod,
  (cart, payment) => cart.length === 0 || payment === ''
);

const ButtonPanel = () => {
  const disable = useSelector(activateButton);
  const dispatch = useDispatch();

  const handleClean = () => {
    dispatch(cleanFields());
  };

  const handleSell = () => {
    dispatch(addSaleRecord());
  };

  return (
    <div className="button-panel">
      <button type="button" disabled={disable} onClick={handleSell}>
        Aceptar
      </button>
      <button type="button" onClick={handleClean}>
        Limpiar
      </button>
    </div>
  );
};

export default ButtonPanel;
