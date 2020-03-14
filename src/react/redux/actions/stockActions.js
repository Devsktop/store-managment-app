import Swal from 'sweetalert2';

export const SUBSTRACT_PRODUCTS = 'SUBSTRACT_PRODUCTS';

export const substractProduct = productQuantity => ({
  type: SUBSTRACT_PRODUCTS,
  payload: { ...productQuantity }
});

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProductsAction = products => ({
  type: FETCH_PRODUCTS,
  payload: { products }
});

//  SOLO PARA SIMULAR LLAMADA A LA BASE DE DATOS
const products = {
  0: {
    product: 'Vaper azul',
    category: 1,
    stock: 0,
    purchasePrice: 20,
    price: 30,
    id: 0
  },
  1: {
    product: 'Esencia vergataria',
    category: 3,
    stock: 13,
    purchasePrice: 5,
    price: 10,
    id: 1
  },
  2: {
    product: 'Vaper Electronico activo',
    category: 1,
    stock: 4,
    purchasePrice: 40,
    price: 60,
    id: 2
  },
  3: {
    product: 'Filtro de vaper',
    category: 2,
    stock: 20,
    purchasePrice: 10,
    price: 15,
    id: 3
  },
  4: {
    product: 'Resistencia normal',
    category: 2,
    stock: 15,
    purchasePrice: 3,
    price: 5,
    id: 4
  },
  5: {
    product: 'Vaper verde de marihuana',
    category: 1,
    stock: 6,
    purchasePrice: 10,
    price: 20,
    id: 5
  }
};

export function fetchProducts() {
  return dispatch => {
    // HACER FETCH A LA BDD
    return new Promise(resolve => setTimeout(resolve, 3000))
      .then(() => {
        // ENVIAR LOS PRODUCTOS RES DE BDD
        console.log('fetching products');
        dispatch(fetchProductsAction(products));
      })
      .then(() => {
        dispatch({ type: 'CART_FETCHED' });
      });
  };
}

export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const createProductAction = product => ({
  type: CREATE_PRODUCT,
  payload: { product }
});

export const createProduct = product => {
  return dispatch => {
    Swal.fire({
      title: 'Creando producto',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
            dispatch(createProductAction(product));
            Swal.hideLoading();
            Swal.fire({
              title: 'El producto se ha registrado con éxito',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                icon: 'icon-class',
                title: 'title-class'
              }
            });
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const EDITE_PRODUCT = 'EDITE_PRODUCT';

const editeProductAction = product => ({
  type: EDITE_PRODUCT,
  payload: { product }
});

export const editeProduct = product => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando producto',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
            dispatch(editeProductAction(product));
            Swal.hideLoading();
            Swal.fire({
              title: 'El producto se ha modificado con éxito',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                icon: 'icon-class',
                title: 'title-class'
              }
            });
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const DELETE_PRODUCT = 'DELETE_PRODUCT';

const deleteProductAction = id => ({
  type: DELETE_PRODUCT,
  payload: { id }
});

export function deleteProduct(id) {
  return dispatch => {
    // HACER FETCH A LA BDD

    Swal.fire({
      title: '¿Seguro que desea eliminar este producto?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        Swal.getCancelButton().style.display = 'none';
        return new Promise(resolve => setTimeout(resolve, 3000));
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
        dispatch(deleteProductAction(id));
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El producto ha sido eliminado satisfactoriamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            icon: 'icon-class',
            title: 'title-class',
            content: 'content-class'
          }
        });
      }
    });
  };
}

export const CREATE_CATEGORY = 'CREATE_CATEGORY';

const createCategoryAction = category => ({
  type: CREATE_CATEGORY,
  payload: { category }
});

export const createCategory = category => {
  return dispatch => {
    Swal.fire({
      title: 'Agregando categoría',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
            dispatch(createCategoryAction(category));
            Swal.hideLoading();
            Swal.fire({
              title: 'Se ha registrado la categoria',
              text: '',
              icon: 'success',
              confirmButtonText: 'Aceptar',
              customClass: {
                icon: 'icon-class',
                title: 'title-class'
              }
            });
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const CURRENT_CATEGORY = 'CURRENT_CATEGORY';

export const currentCategory = id => ({
  type: CURRENT_CATEGORY,
  payload: { id }
});

export const PRODUCT_FILTER = 'PRODUCT_FILTER';

export const productFilter = value => ({
  type: PRODUCT_FILTER,
  payload: { value }
});
