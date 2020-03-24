/* eslint-disable camelcase */
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
          totals: { dolar },
          cart,
          paymentMethod,
          observations
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
          paymentMethod,
          observations
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
            console.log(res);
            if (res.status === 'ok') {
              const { id, netTotal } = res;
              // Dispatch to the stockReducer
              dispatch({
                type: SUBSTRACT_PRODUCTS,
                payload: { ...substracProducts }
              });

              // Dispatch to the saleRecordsReducer
              dispatch({
                type: ADD_SALE_RECORD,
                payload: { record, id, netTotal }
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

const selectSaleRecordAction = record => ({
  type: SELECT_SALE_RECORD,
  payload: { record }
});

export function selectSaleRecord(id) {
  return (dispatch, getState) => {
    if (id) {
      const url = 'http://localhost:3500/api/tasks/Ver_Venta';
      const config = {
        method: 'POST',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const { exchange } = getState().cart;

      return fetch(url, config)
        .then(res => res.json())
        .then(res => {
          if (res.status === 'ok') {
            const record = res.userdata.map(e => {
              const { Descripcion_P, Precio_P, Cantidad, Total, Id_Venta } = e;

              return {
                id: Id_Venta,
                product: Descripcion_P,
                quantity: Cantidad,
                price: Precio_P,
                total: Total,
                totalBs: Total * exchange
              };
            });
            dispatch(selectSaleRecordAction(record));
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
    return dispatch(selectSaleRecordAction([]));
  };
}

export const FETCH_SALE_RECORDS = 'FETCH_SALE_RECORDS';

export const fetcSaleRecordsAction = (records, total, netTotal) => ({
  type: FETCH_SALE_RECORDS,
  payload: { records, total, netTotal }
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

    return fetch(url, config)
      .then(res => res.json())
      .then(res => {
        console.log('fetch records');
        if (res[0].length > 0) {
          const records = {};
          let total = 0;
          let netTotal = 0;
          res[0].forEach(record => {
            const {
              Id_ResumenVenta,
              Total_Venta,
              Metodo_Pago,
              Observacion,
              Fecha,
              Total_Neto
            } = record;

            records[Id_ResumenVenta] = {
              id: Id_ResumenVenta,
              date: parseDateToYMD(new Date(Fecha)),
              dolar: Total_Venta,
              paymentMethod: Metodo_Pago,
              observations: Observacion
            };
            total += Total_Venta;
            netTotal += Total_Neto;
          });

          dispatch(fetcSaleRecordsAction(records, total, netTotal));
        }
      });
  };
}

export const LOGOUT_SALE_RECORDS = 'LOGOUT_SALE_RECORDS';

export const SET_TODAY = 'SET_TODAY';

export const setToday = today => ({
  type: SET_TODAY,
  payload: { today }
});
