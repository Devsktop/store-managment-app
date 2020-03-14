import React, { useState, useRef, useEffect } from 'react';
import { SelectFilter, QuantityInput } from 'react-pulpo';
import { createSelector } from 'reselect';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from 'react/redux/actions/cartActions';

// Components
import ListComponent from './SelectFilter/ListComponent';

// Gettin just products in car

const productsInCart = createSelector(
  state => state.cart.productsInCart,
  state => state.stock.products,
  (inCartIds, products) =>
    Object.values(products).filter(product => !inCartIds.includes(product.id))
);

const AddToCart = () => {
  // State
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectOptions, setSelectOptios] = useState({});

  const exchange = useSelector(state => state.cart.exchange);
  const products = useSelector(productsInCart);

  console.log('renderizé AddToCart');

  // Refs
  const quantityInputRef = useRef();
  const SelectInputRef = useRef();

  // Dispatch
  const dispatch = useDispatch();

  // Effects
  useEffect(() => {
    // Focus the Quantity's input when a product is selected
    if (quantityInputRef.current) quantityInputRef.current.focus();
  }, [currentProduct]);

  // Functions
  // Set the selected item to the state
  const onSelectProduct = item => {
    setCurrentProduct(item);
  };

  // Handle the SelectFilter's onChange actions
  const onChangeSelect = () => {
    if (currentProduct) setCurrentProduct(null);
  };

  // Add product to the store when an amount is set
  const addToCart = quantity => {
    selectOptions.clean();
    onChangeSelect();
    SelectInputRef.current.focus();
    const { product, price, id, purchasePrice } = currentProduct;
    const dolar = quantity * price;
    const bolivar = dolar * exchange;
    const profitDolar = quantity * purchasePrice;
    const profitBolivar = profitDolar * exchange;
    const profits = { profitDolar, profitBolivar };

    const cartProduct = {
      product,
      quantity,
      price,
      dolar,
      bolivar,
      id,
      profits
    };
    dispatch(addProductToCart(cartProduct));
  };

  // Disable item where stock is equal to zero in selecfilter
  const disableFunc = item => item.stock === 0;

  // Render components
  return (
    <div className="add-to-cart">
      <SelectFilter
        data={products}
        filter="product"
        ListComponent={ListComponent}
        onSelect={onSelectProduct}
        onChange={onChangeSelect}
        placeholder="Ingrese producto"
        style={{
          divWidth: '60%',
          divMargin: '0',
          divOthers: `border: 1px solid red`,
          inputPlaceHolder: '#51a4d4',
          inputOthers: `
          height: 38px;
          border: 2px solid #88d6f5;
          box-shadow: none;
          border-radius: 5px;
          color: #0d3f8a;
          outline: none;
          width: 100%
          `,
          inputPadding: '7px',
          listOthers: `
          border: 1px solid #eee;
          width: 100%
          `,
          itemBackground: '#88d6f5',
          itemColor: '#fff',
          currentBackground: '#51a4d4',
          listBorderRound: true,
          noMatchOthers: `
          background-color: #fff
          `
        }}
        ref={SelectInputRef}
        setOptions={setSelectOptios}
        disableFunc={disableFunc}
      />
      {currentProduct && (
        <QuantityInput
          maxNumber={currentProduct.stock}
          handleAccept={addToCart}
          ref={quantityInputRef}
        />
      )}
    </div>
  );
};

export default React.memo(AddToCart);
