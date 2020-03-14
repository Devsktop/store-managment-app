import {
  SUBSTRACT_PRODUCTS,
  FETCH_PRODUCTS,
  CURRENT_CATEGORY,
  PRODUCT_FILTER,
  CREATE_PRODUCT,
  EDITE_PRODUCT,
  DELETE_PRODUCT,
  CREATE_CATEGORY
} from '../actions/stockActions';

const initialState = {
  products: {},
  categories: {
    0: { category: 'Miscellaneous', id: 0 },
    1: { category: 'Vapers', id: 1 },
    2: { category: 'Accesorios', id: 2 },
    3: { category: 'Esencias', id: 3 }
  },
  currentCategory: -99,
  productFilter: '',
  isFetching: true
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
      console.log(payload.products);
      return {
        ...state,
        products: { ...payload.products },
        isFetching: false
      };

    case CREATE_PRODUCT: {
      // A EL PRODUCTO SE LE AGREGA LA LONGITUD SENGUN EL NUMERO DE
      // DE REGISTRO EN EL STATE, ESTO ES PARA EFECTOS DE PRUEBA EN REACT
      // ESTE CODIGO DEBE SER REMPLAZADO POR UNO QUE LUEGO UTILICE UN
      // ID GENERADO POR LA BASE DE DATOS
      const id = Object.keys(state.products).length;
      const product = { ...payload.product, id };
      const products = { ...state.products, [product.id]: product };
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

    default:
      return state;
  }
}
