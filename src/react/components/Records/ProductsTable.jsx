import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { DataTable } from 'react-pulpo';

const RecordProducts = createSelector(
  state => state.saleRecords.recordsProducts,
  state => state.saleRecords.currentRecord,
  (recordsProducts, currentRecord) => recordsProducts[currentRecord]
);

const ProductsTable = () => {
  const recordProducts = useSelector(RecordProducts);

  return (
    <DataTable
      data={recordProducts || []}
      properties={['Producto', 'Cantidad', 'Precio', 'Total $', 'Total BsS']}
    />
  );
};

export default ProductsTable;
