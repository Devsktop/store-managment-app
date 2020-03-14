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
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
            // Get current cart Data
            const {
              totals: { dolar, bolivar },
              cart,
              paymentMethod,
              observations,
              profits: { profitDolar, profitBolivar }
            } = getState().cart;

            // Store cart's products in a variable
            const recordProducts = [...cart];

            const substracProducts = {};

            // create an object with the product's ids as keys and the quantity to be substracted as values
            recordProducts.forEach(({ id, quantity }) => {
              substracProducts[id] = quantity;
            });

            // Dispatch to the stockReducer
            dispatch({
              type: SUBSTRACT_PRODUCTS,
              payload: { ...substracProducts }
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

            // Dispatch to the saleRecordsReducer
            dispatch({
              type: ADD_SALE_RECORD,
              payload: { record, recordProducts, profits }
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

    // HACER FETCH A LA BDD
    return new Promise(resolve => setTimeout(resolve, 3000)).then(() => {
      console.log('fetching RECORDS');
      const recordsData = {
        records: {},
        recordsProducts: {},
        currentRecord: [],
        profits: {
          totalProfitDolar: 0,
          netProfitDolar: 0,
          totalProfitBolivar: 0,
          netProfitBolivar: 0
        },
        recordsFilter: parseDateToYMD(new Date())
      };

      dispatch(fetcSaleRecordsAction(recordsData));
    });
  };
}
