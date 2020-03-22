import React from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from 'react-pulpo';

const ProductsTable = () => {
  const recordProducts = useSelector(state => state.saleRecords.currentRecord);

  return (
    <DataTable
      data={recordProducts || []}
      properties={['Producto', 'Cantidad', 'Precio', 'Total $', 'Total BsS']}
    />
  );
};

export default ProductsTable;
