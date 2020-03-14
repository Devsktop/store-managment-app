import {
  ADD_PRODUCT_TO_CART,
  DELETE_PRODUCT_FROM_CART,
  SET_PAYMENT_METHOD,
  SET_OBSERVATIONS,
  CLEAN_FIELDS
} from '../actions/cartActions';

// FALTA EXCHANGE ACTION

const initialState = {
  cart: [],
  productsInCart: [],
  totals: {
    dolar: 0,
    bolivar: 0
  },
  profits: {
    profitDolar: 0,
    profitBolivar: 0
  },
  exchange: 10000,
  paymentMethod: '',
  observations: ''
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case ADD_PRODUCT_TO_CART: {
      // payload = product = { product, quantity, price, dolar, bolivar, id, profits: {profitDolar, profitBolivar}}

      const product = { ...payload.product };

      // Adding new product's totals to state's totals
      const dolar = state.totals.dolar + product.dolar;
      const bolivar = dolar * state.exchange;

      // Stracting and adding profits
      const profits = {
        profitDolar: state.profits.profitDolar + product.profits.profitDolar,
        profitBolivar:
          state.profits.profitBolivar + product.profits.profitBolivar
      };

      // Deleting profits from the payload
      delete product.profits;

      // Adding new product's id to productsInCart id list
      const productsInCart = [...state.productsInCart, product.id];

      return {
        ...state,
        cart: [...state.cart, product],
        productsInCart,
        totals: { dolar, bolivar },
        profits
      };
    }

    case DELETE_PRODUCT_FROM_CART: {
      // payload = productID = number

      // Getting the product that will be deleted
      const [deletedProduct] = state.cart.filter(
        product => product.id === payload.productId
      );

      // substract the deleted product's totals from the state's totals
      const dolar = state.totals.dolar - deletedProduct.dolar;
      const bolivar = state.totals.bolivar - deletedProduct.bolivar;

      // Getting the products without the deleted products
      const cart = state.cart.filter(
        product => product.id !== payload.productId
      );

      // Getting the products in cart's ids without deleted product's id
      const productsInCart = state.productsInCart.filter(
        id => id !== payload.productId
      );

      return {
        ...state,
        cart,
        productsInCart,
        totals: { dolar, bolivar }
      };
    }

    case SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: payload.paymentMethod
      };

    case SET_OBSERVATIONS:
      return {
        ...state,
        observations: payload.observations
      };

    case CLEAN_FIELDS: {
      return {
        ...state,
        cart: [],
        productsInCart: [],
        totals: { dolar: 0, bolivar: 0 },
        profits: {
          profitDolar: 0,
          profitBolivar: 0
        },
        paymentMethod: '',
        observations: ''
      };
    }
    default:
      return state;
  }
}
