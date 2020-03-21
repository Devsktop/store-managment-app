export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';

export const addProductToCart = product => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { product }
});

export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';

export const deleteProductFromCart = productId => ({
  type: DELETE_PRODUCT_FROM_CART,
  payload: { productId }
});

export const SET_PAYMENT_METHOD = 'SET_PAYMENT_METHOD';

export const setPaymentMethod = paymentMethod => ({
  type: SET_PAYMENT_METHOD,
  payload: { paymentMethod }
});

export const SET_OBSERVATIONS = 'SET_OBSERVATIONS';

export const setObservations = observations => ({
  type: SET_OBSERVATIONS,
  payload: { observations }
});

export const CLEAN_FIELDS = 'CLEAN_FIELDS';

export const cleanFields = () => ({
  type: CLEAN_FIELDS
});

export const SET_DOLAR = 'SET_DOLAR';

export const setDolar = dolar => ({
  type: SET_DOLAR,
  payload: { dolar }
});
