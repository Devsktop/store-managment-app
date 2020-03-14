import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable } from 'react-pulpo';

import { deleteProductFromCart } from 'react/redux/actions/cartActions';

// Componentss

const DataTableH = () => {
  const currentCart = useSelector(state => state.cart.cart);
  const dispatch = useDispatch();

  const deleteProduct = productId => {
    dispatch(deleteProductFromCart(productId));
  };

  console.log('renderize tabla');

  return (
    <>
      <DataTable
        properties={['Producto', 'Cantidad', 'Precio', 'Total $', 'Total Bs.S']}
        data={currentCart || []}
        deleteRow={deleteProduct}
      />
    </>
  );
};

export default DataTableH;
