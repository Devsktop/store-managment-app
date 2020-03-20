/* eslint-disable camelcase */
import Swal from 'sweetalert2';

export const SUBSTRACT_PRODUCTS = 'SUBSTRACT_PRODUCTS';

export const substractProduct = productQuantity => ({
  type: SUBSTRACT_PRODUCTS,
  payload: { ...productQuantity }
});

export const CREATE_PRODUCT = 'CREATE_PRODUCT';

const createProductAction = product => ({
  type: CREATE_PRODUCT,
  payload: { product }
});

export const createProduct = productn => {
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

        const { product, category, stock, purchasePrice, price } = productn;
        const url = 'http://localhost:3500/api/tasks/producto';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            desc: product,
            precio: price,
            stock,
            cat: category,
            precio_c: purchasePrice
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 'ok') {
              dispatch(createProductAction({ ...productn, id: res.id }));
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
            }
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

export const editeProduct = productn => {
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
        const { product, category, stock, purchasePrice, price, id } = productn;
        const url = 'http://localhost:3500/api/tasks/actproducto';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            cp: id,
            des: product,
            pre: price,
            cant: stock,
            cat: category,
            pre_com: purchasePrice
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 'ok') {
              dispatch(editeProductAction(productn));
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
            }
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
        const url = 'http://localhost:3500/api/tasks/producto';
        const config = {
          method: 'DELETE',
          body: JSON.stringify({
            id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config).then(res => res.json());
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value.status === 'ok') {
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

export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const fetchProductsAction = products => ({
  type: FETCH_PRODUCTS,
  payload: { products }
});

export function fetchProducts() {
  return dispatch => {
    // HACER FETCH A LA BDD
    const url = 'http://localhost:3500/api/tasks/producto';

    return fetch(url)
      .then(res => res.json())
      .then(res => {
        const products = {};

        // Parse res from API to APP Format
        res.forEach(product => {
          const {
            Id_Producto,
            Descripcion_P,
            Precio_P,
            Stock,
            Categoria,
            Precio_Compra
          } = product;

          products[Id_Producto] = {
            product: Descripcion_P,
            category: Categoria,
            stock: Stock,
            purchasePrice: Precio_Compra,
            price: Precio_P,
            id: Id_Producto
          };
        });

        console.log(products);

        dispatch(fetchProductsAction(products));
      })
      .catch(err => {
        console.log('hubo error:' + err);
      });
  };
}

export const LOGOUT_STOCK = 'LOGOUT_STOCK';
