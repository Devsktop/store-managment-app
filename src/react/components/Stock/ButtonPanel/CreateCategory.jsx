import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCategory } from 'react/redux/actions/stockActions';
import CategoryPortal from './CategoryPortal';

const CreateCategory = () => {
  const [showPortal, setShowPortal] = useState(false);
  const dispatch = useDispatch();

  const closePortal = () => {
    setShowPortal(false);
  };

  const handleOnclick = () => {
    setShowPortal(true);
  };

  const handlePortal = category => {
    dispatch(createCategory(category));
    closePortal();
  };

  return (
    <>
      <button type="button" onClick={handleOnclick}>
        Agregar categoría
      </button>
      {showPortal && (
        <CategoryPortal onClose={closePortal} onAccept={handlePortal} />
      )}
    </>
  );
};

export default CreateCategory;
