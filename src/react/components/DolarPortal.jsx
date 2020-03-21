/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setDolar } from 'react/redux/actions/cartActions';

const DolarPortal = ({ onClose }) => {
  const dispatch = useDispatch();
  const initialDolar = useSelector(state => state.cart.exchange);
  const [dolar, setDolarValue] = useState(initialDolar);
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validateInput = e => {
    if (e.endsWith(' ')) return false;
    if (e.charAt(e.length - 1).match(/\D/)) return false;
    return true;
  };

  const handleDolar = e => {
    if (validateInput(e.target.value)) setDolarValue(e.target.value);
  };

  const disableAccept = () => {
    if (dolar === '' || parseInt(dolar, 10) < 1) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const url = 'http://localhost:3500/api/tasks/actdolar';
    const config = {
      method: 'POST',
      body: JSON.stringify({ Dolar: dolar }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, config)
      .then(res => res.json())
      .then(res => {
        if (res.status === 'ok') {
          dispatch(setDolar(parseInt(dolar, 10)));
        } else {
          console.log('hubo un error');
        }
      })
      .catch(() => {
        console.log('hubo un error');
      });

    if (onClose) onClose();
  };

  return ReactDOM.createPortal(
    <div className="portal">
      <div className="portal-box">
        <form className="sweet-form" onSubmit={handleSubmit}>
          <label htmlFor="dolar">
            Ingrese Precio del dolar:
            <input
              type="input"
              onChange={handleDolar}
              value={dolar}
              className="center"
              ref={inputRef}
            />
          </label>
          <button
            type="submit"
            className={`button button-accept ${
              onClose ? null : 'button-large'
            }`}
            disabled={disableAccept()}
          >
            Aceptar
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="button button-cancel"
            >
              Cancelar
            </button>
          )}
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

export default DolarPortal;
