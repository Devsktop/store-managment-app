/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const customStyles = {
  container: provided => ({
    ...provided,
    width: '100%',
    marginTop: 8
  }),
  control: provided => ({
    ...provided,
    border: '2px solid #88d6f5',
    cursor: 'pointer',
    fontFamily: 'Arial',
    // eslint-disable-next-line no-useless-computed-key
    ['&:hover']: {
      border: '2px solid #88d6f5'
    }
  }),
  menu: provided => ({
    ...provided,
    margin: 0,
    fontFamily: 'Arial'
  }),
  singleValue: provided => ({
    ...provided,
    color: '#0d3f8a'
  })
};

const ProductPortal = ({ product, onClose, onAccept }) => {
  const categories = useSelector(state => state.stock.categories);
  const categoriesNames = Object.keys(categories).map(key => ({
    value: categories[key].id,
    label: categories[key].category
  }));

  const defaultCategory = product
    ? {
        value: categories[product.category].id,
        label: categories[product.category].category
      }
    : categoriesNames[0];

  const [productName, setProductName] = useState(
    product ? product.product : ''
  );
  const [stock, setStock] = useState(product ? product.stock : '');
  const [category, setCategory] = useState(product ? product.category : 0);
  const [purchase, setPurchase] = useState(
    product ? product.purchasePrice : ''
  );
  const [sell, setSell] = useState(product ? product.price : '');

  const validateOnlyNumbers = input => {
    if (input.length === 1 && input.charAt(0) === '0') return false;
    if (input.match(/^\d*$/) || input.length === 0) return true;
    return false;
  };

  const handleProductName = e => {
    setProductName(e.target.value);
  };

  const handleStock = e => {
    if (validateOnlyNumbers(e.target.value)) setStock(e.target.value);
  };

  const categorySelect = ({ value }) => {
    setCategory(value);
  };

  const handlePurchase = e => {
    if (validateOnlyNumbers(e.target.value)) {
      setPurchase(e.target.value);
      setSell('');
    }
  };

  const handleSell = e => {
    if (purchase.length === 0) return null;
    if (validateOnlyNumbers(e.target.value)) setSell(e.target.value);
    return null;
  };

  const validateInputs = () => {
    if (
      productName.trim() !== '' &&
      stock !== '' &&
      purchase !== '' &&
      sell !== '' &&
      parseInt(sell, 10) > parseInt(purchase, 10)
    )
      return false;

    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newProduct = {
      product: productName,
      category,
      stock: parseInt(stock, 10),
      purchasePrice: parseInt(purchase, 10),
      price: parseInt(sell, 10),
      id: product ? product.id : null
    };

    onAccept(newProduct);
  };

  return ReactDOM.createPortal(
    <div className="portal">
      <div className="portal-box">
        {product && <p>Código producto: {product.id}</p>}
        <form className="sweet-form" onSubmit={handleSubmit}>
          <label htmlFor="productName">
            Ingrese Nombre del producto:
            <input
              type="input"
              onChange={handleProductName}
              value={productName}
            />
          </label>
          <label htmlFor="category">
            Selecione categoría para producto:
            <Select
              options={categoriesNames}
              isSearchable={false}
              styles={customStyles}
              defaultValue={defaultCategory}
              onChange={categorySelect}
            />
          </label>
          <label htmlFor="stock">
            Ingrese stock del producto:
            <input type="input" onChange={handleStock} value={stock} />
          </label>
          <label htmlFor="purchase">
            Ingrese precio de compra:
            <input type="input" onChange={handlePurchase} value={purchase} />
          </label>
          <label htmlFor="sell">
            Ingrese precio de venta:
            <input type="input" onChange={handleSell} value={sell} />
          </label>
          <button
            type="submit"
            className="button button-accept"
            disabled={validateInputs()}
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
    </div>,
    document.getElementById('portal')
  );
};

export default ProductPortal;
