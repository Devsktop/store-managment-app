import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setPaymentMethod,
  setObservations
} from 'react/redux/actions/cartActions';

const Description = () => {
  const dispatch = useDispatch();
  const valuePayment = useSelector(state => state.cart.paymentMethod);
  const valueObservations = useSelector(state => state.cart.observations);

  const onChangePayment = e => {
    if (!(valuePayment.length === 0 && e.target.value.endsWith(' ')))
      dispatch(setPaymentMethod(e.target.value));
  };

  const onChangeObservations = e => {
    dispatch(setObservations(e.target.value));
  };

  console.log('renderize description');

  return (
    <div className="description">
      <label htmlFor="payment">
        Método de pago:
        <input
          type="text"
          spellCheck="false"
          value={valuePayment}
          onChange={onChangePayment}
        />
      </label>
      <label htmlFor="observation">
        Observaciones:
        <textarea
          spellCheck="false"
          onChange={onChangeObservations}
          value={valueObservations}
        />
      </label>
    </div>
  );
};

export default Description;
