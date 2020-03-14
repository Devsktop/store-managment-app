/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentCategory } from 'react/redux/actions/stockActions';
import Select from 'react-select';

const customStyles = {
  container: provided => ({
    ...provided,
    width: '100%',
    marginRight: 50
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

const categoriesSelector = state => {
  const { categories } = state.stock;
  return Object.keys(categories).map(key => ({
    value: categories[key].id,
    label: categories[key].category
  }));
};

const StockFilterSelect = () => {
  const categories = [
    { value: -99, label: 'Todos' },
    ...useSelector(categoriesSelector)
  ];

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(currentCategory(-99));
    };
  }, []);

  const handleSelect = ({ value }) => {
    dispatch(currentCategory(value));
  };

  return (
    <div className="stock-filter-select">
      <label className="select-label">Filtar por Categoria:</label>
      <Select
        options={categories}
        isSearchable={false}
        styles={customStyles}
        defaultValue={categories[0]}
        onChange={handleSelect}
      />
    </div>
  );
};

export default StockFilterSelect;
