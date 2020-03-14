import React, { useState } from 'react';
import Proptypes from 'prop-types';

const CategoryPortal = ({ onClose, onAccept }) => {
  const [category, setCategory] = useState('');

  const handleCategory = e => {
    setCategory(e.target.value);
  };

  const validateInput = () => {
    if (category.trim().length === 0) return true;
    return false;
  };

  const handleSubmit = () => {
    onAccept(category);
  };

  return (
    <div className="portal">
      <div className="portal-box">
        <form className="sweet-form" onSubmit={handleSubmit}>
          <label htmlFor="productName">
            Ingrese Nombre del producto:
            <input type="input" onChange={handleCategory} value={category} />
          </label>
          <button
            type="submit"
            className="button button-accept"
            disabled={validateInput()}
          >
            Aceptar
          </button>
          <button
            type="button"
            onClick={onClose}
            className="button button-cancel"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

CategoryPortal.propTypes = {
  onClose: Proptypes.func.isRequired,
  onAccept: Proptypes.func.isRequired
};

export default CategoryPortal;
