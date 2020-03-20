import {
  SUBSTRACT_PRODUCTS,
  FETCH_PRODUCTS,
  CURRENT_CATEGORY,
  PRODUCT_FILTER,
  CREATE_PRODUCT,
  EDITE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_CATEGORY,
  LOGOUT_STOCK
} from '../actions/stockActions';

const initialState = {
  products: {},
  categories: ['Miscellaneous', 'Vapers', 'Accesorios', 'Esencias'],
  currentCategory: -99,
  productFilter: ''
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUBSTRACT_PRODUCTS: {
      const products = {};

      Object.keys(payload).forEach(key => {
        products[key] = {
          ...state.products[key],
          stock: state.products[key].stock - payload[key]
        };
      });

      console.log(products);

      return {
        ...state,
        products: { ...state.products, ...products }
      };
    }

    case FETCH_PRODUCTS:
      return {
        ...state,
        products: { ...payload.products }
      };

    case CREATE_PRODUCT: {
      const { id } = payload.product;
      const product = { ...payload.product, id };
      const products = { ...state.products, [id]: product };
      return {
        ...state,
        products
      };
    }

    case EDITE_PRODUCT: {
      const { product } = payload;
      const products = { ...state.products, [product.id]: product };

      return {
        ...state,
        products
      };
    }

    case DELETE_PRODUCT: {
      const products = { ...state.products };
      delete products[payload.id];
      return {
        ...state,
        products
      };
    }

    case CREATE_CATEGORY: {
      const { category } = payload;
      const id = state.categories.length;

      const categories = { ...state.categories, [id]: { category, id } };

      return {
        ...state,
        categories
      };
    }

    case CURRENT_CATEGORY:
      // We use -99 to represent all categories
      return {
        ...state,
        currentCategory: payload.id
      };

    case PRODUCT_FILTER:
      return {
        ...state,
        productFilter: payload.value
      };

    case LOGOUT_STOCK:
      return {
        ...initialState
      };

    default:
      return state;
  }
}
