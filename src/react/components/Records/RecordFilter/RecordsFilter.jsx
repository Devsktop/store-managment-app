/* eslint-disable no-useless-computed-key */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import DatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';

import { fetchSaleRecords } from 'react/redux/actions/saleRecordsActions';

registerLocale('es', es);

const options = [
  { value: 'today', label: 'Registros del día' },
  { value: 'day', label: 'Día específico' },
  { value: 'period', label: 'Periodo de tiempo' }
];

const customStyles = {
  container: provided => ({
    ...provided,
    width: 300,
    marginRight: 50
  }),
  control: provided => ({
    ...provided,
    border: '2px solid #88d6f5',
    cursor: 'pointer',
    fontFamily: 'Arial',
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

// eslint-disable-next-line react/prop-types
const ExampleCustomInput = ({ value, onClick }) => (
  <button className="date-button" onClick={onClick} type="button">
    {value}
  </button>
);

const RecordsFilter = () => {
  const dispatch = useDispatch();
  const [option, setOption] = useState('today');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [day, setDay] = useState(new Date());

  // Asyncronous call to api to get Records
  // INCLUIR DISPATCH
  const handleSearchDate = (from, to) => {
    dispatch(fetchSaleRecords(from, to));
  };

  const handleSelect = ({ value }) => {
    setOption(value);
    if (value === 'today') handleSearchDate(new Date(), new Date());
  };

  const handleFrom = date => {
    setStartDate(date);
    setEndDate(date);
  };

  return (
    <div className="records-filter">
      <Select
        options={options}
        isSearchable={false}
        styles={customStyles}
        placeholder=""
        defaultValue={{ value: 'today', label: 'Registros del día' }}
        onChange={handleSelect}
      />
      {option === 'day' && (
        <div className="date-picker-container">
          <div className="date-picker-box">
            <p>Selecione día:</p>
            <DatePicker
              selected={day}
              onChange={date => setDay(date)}
              maxDate={Date.now()}
              customInput={<ExampleCustomInput />}
              locale="es"
            />
          </div>
          <button
            type="button"
            className="date-button search-button"
            onClick={() => handleSearchDate(day, day)}
          >
            Buscar
          </button>
        </div>
      )}
      {option === 'period' && (
        <div className="date-picker-container">
          <div className="date-picker-box">
            <p>Desde:</p>
            <DatePicker
              selected={startDate}
              selectsStart
              onChange={handleFrom}
              startDate={startDate}
              endDate={endDate}
              maxDate={Date.now()}
              customInput={<ExampleCustomInput />}
              locale="es"
            />
          </div>
          <div className="date-picker-box">
            <p>Hasta: </p>
            <DatePicker
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              maxDate={Date.now()}
              customInput={<ExampleCustomInput />}
              locale="es"
            />
          </div>
          <button
            type="button"
            className="date-button search-button"
            onClick={() => handleSearchDate(startDate, endDate)}
          >
            Buscar
          </button>
        </div>
      )}
    </div>
  );
};

export default RecordsFilter;
