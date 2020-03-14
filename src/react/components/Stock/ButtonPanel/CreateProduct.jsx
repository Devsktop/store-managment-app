import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProduct } from 'react/redux/actions/stockActions';
import ProductPortal from '../ProductsPortal/ProductPortal';

const CreateProduct = () => {
  const dispatch = useDispatch();
  const [showPortal, setShowPortal] = useState(false);

  const handleCreate = () => {
    setShowPortal(true);
  };

  const closePortal = () => {
    setShowPortal(false);
  };

  const handlePortal = data => {
    dispatch(createProduct(data));
    closePortal();
  };

  return (
    <>
      <button type="button" onClick={handleCreate}>
        Agregar producto
      </button>
      {showPortal && (
        <ProductPortal onClose={closePortal} onAccept={handlePortal} />
      )}
    </>
  );
};

export default CreateProduct;
