import Swal from 'sweetalert2';
import { SUBSTRACT_PRODUCTS } from './stockActions';

export const ADD_SALE_RECORD = 'ADD_SALE_RECORD';

const parseDateToYMD = date => {
  const dd = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

  const mm =
    date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;

  const yyyy = date.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

export const addSaleRecord = () => {
  return function(dispatch, getState) {
    // EFECTOS DE REACT, CAMBIAR CUANDO TENGA SERVIDOR

    Swal.fire({
      title: 'Procesando venta',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH

        // Get current cart Data
        const {
          totals: { dolar, bolivar },
          cart,
          paymentMethod,
          observations,
          profits: { profitDolar, profitBolivar }
        } = getState().cart;

        // product id and cant to send to DBB
        const productsCant = cart.map(({ id, quantity }) => ({
          id,
          cant: quantity
        }));

        // Store cart's products in a variable
        const recordProducts = [...cart];

        const substracProducts = {};

        // create an object with the product's ids as keys and the quantity to be substracted as values
        recordProducts.forEach(({ id, quantity }) => {
          substracProducts[id] = quantity;
        });

        // Create sale record Data
        const record = {
          date: parseDateToYMD(new Date()),
          dolar,
          bolivar,
          paymentMethod,
          observations
        };

        // Create profit object
        const profits = {
          dolar,
          bolivar,
          profitDolar,
          profitBolivar
        };

        // Info to API
        const url = 'http://localhost:3500/api/tasks/carritoventa';

        const config = {
          method: 'POST',
          body: JSON.stringify({
            products: productsCant,
            mt: paymentMethod,
            obv: observations
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 'ok') {
              const { id } = res;
              // Dispatch to the stockReducer
              dispatch({
                type: SUBSTRACT_PRODUCTS,
                payload: { ...substracProducts }
              });

              // Dispatch to the saleRecordsReducer
              dispatch({
                type: ADD_SALE_RECORD,
                payload: { record, recordProducts, profits, id }
              });

              dispatch({ type: 'CLEAN_FIELDS' });

              Swal.hideLoading();
              Swal.fire({
                title: 'Venta realizada con exito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              });
            } else {
              Swal.hideLoading();
              Swal.fire({
                title: 'Ha ocurrido un error',
                text: '',
                icon: 'error',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              });
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const SELECT_SALE_RECORD = 'SELECT_SALE_RECORD';

export const selectSaleRecord = id => ({
  type: SELECT_SALE_RECORD,
  payload: { id }
});

export const FETCH_SALE_RECORDS = 'FETCH_SALE_RECORDS';

export const fetcSaleRecordsAction = recordsData => ({
  type: FETCH_SALE_RECORDS,
  payload: { ...recordsData }
});

// SIMULANDO LLAMADA A BASE DE DATOS

export function fetchSaleRecords(from, to) {
  return dispatch => {
    const parsedFrom = parseDateToYMD(from);
    const parsedTo = parseDateToYMD(to);

    const url = 'http://localhost:3500/api/tasks/RegistroFecha';
    const config = {
      method: 'POST',
      body: JSON.stringify({ Desde: parsedFrom, Hasta: parsedTo }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // HACER FETCH A LA BDD
    return fetch(url, config)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        console.log(new Date(res[0][0].Fecha));
        const recordsData = {
          records: {},
          recordsProducts: {},
          currentRecord: [],
          profits: {
            totalProfitDolar: 0,
            netProfitDolar: 0,
            totalProfitBolivar: 0,
            netProfitBolivar: 0
          }
        };
        dispatch(fetcSaleRecordsAction(recordsData));
      });
  };
}

export const LOGOUT_SALE_RECORDS = 'LOGOUT_SALE_RECORDS';
