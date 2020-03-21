import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { DataTable } from 'react-pulpo';
import { deleteProduct, editeProduct } from 'react/redux/actions/stockActions';
import memoSelector from './memoSelector';
import ProductPortal from '../ProductsPortal/ProductPortal';

// Filters the products by category and input
const productsSelector = memoSelector(
  state => state.stock.products,
  state => state.stock.currentCategory,
  state => state.stock.productFilter,
  (products, category, filter) => {
    // Parsing Object to array and adding profit
    let filteredProducts = Object.keys(products).map(key => products[key]);

    // Filtering by category
    if (category !== -99) {
      filteredProducts = filteredProducts.filter(
        product => product.category === category
      );
    }
    // Filtering by the input text
    if (filter.length > 0) {
      return filteredProducts.filter(
        ({ product }) =>
          product.toLowerCase().indexOf(filter.toLowerCase()) > -1
      );
    }
    return filteredProducts;
  }
);

// Select product to edite
const productSelector = createSelector(
  state => state.stock.products,
  (_, id) => id,
  (products, id) => products[id]
);

// COMPONENT
const ProductsTable = () => {
  const dispatch = useDispatch();
  const products = useSelector(productsSelector);
  const categories = useSelector(state => state.stock.categories);
  const [showPortal, setShowPortal] = useState(false);
  const [productId, setProductId] = useState(null);
  const productToEdite = useSelector(state =>
    productSelector(state, productId)
  );

  const productsData = products.map(product => ({
    ...product,
    category: product.category,
    profit: product.price - product.purchasePrice
  }));

  const handleDelete = id => dispatch(deleteProduct(id));

  const handleUpdate = id => {
    setProductId(id);
    setShowPortal(true);
  };

  const closePortal = () => {
    setProductId(null);
    setShowPortal(false);
  };

  const handlePortal = data => {
    dispatch(editeProduct(data));
    closePortal();
  };

  return (
    <div className="products-table">
      <DataTable
        data={productsData}
        properties={[
          'Producto',
          'Categoria',
          'Stock',
          'Compra',
          'Venta',
          'Ganancia'
        ]}
        updateRow={handleUpdate}
        deleteRow={handleDelete}
      />
      {showPortal && (
        <ProductPortal
          onClose={closePortal}
          categories={categories}
          onAccept={handlePortal}
          product={productToEdite}
        />
      )}
    </div>
  );
};

export default ProductsTable;
