/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Proptypes from 'prop-types';

const ValidateUser = ({ onAccept, goBack }) => {
  const [isValidating, setIsValidating] = useState(false);
  const [user, setUser] = useState('');

  if (isValidating)
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Verificando usuario...</p>
      </div>
    );

  const handleUser = e => {
    setUser(e.target.value);
  };

  const validateInputs = () => {
    if (user === '') return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsValidating(true);

    const url = 'http://localhost:3500/api/tasks/verificarUser';
    const config = {
      method: 'POST',
      body: JSON.stringify({ userN: user }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, config)
      .then(res => res.json())
      .then(({ userdata }) => {
        if (userdata.resp === null) {
          Swal.fire({
            title: 'El usuario ingresado no existe',
            text: '',
            icon: 'error',
            confirmButtonText: 'Continuar',
            customClass: {
              icon: 'icon-class',
              title: 'title-class'
            }
          });
          setIsValidating(false);
        } else {
          const { Id_Usuario, Pregunta_Seg } = userdata;

          const userQuestion = {
            id: Id_Usuario,
            question: Pregunta_Seg,
            user
          };
          onAccept(userQuestion);
        }
      });
  };

  return (
    <>
      <h2 className="login-title">Recuperación de usuario</h2>
      <FontAwesomeIcon icon={faTools} className="login-icon" />
      <form className="sweet-form" onSubmit={handleSubmit}>
        <label htmlFor="user">
          Usuario:
          <input type="input" onChange={handleUser} value={user} />
        </label>
        <button
          type="submit"
          className="button button-accept"
          disabled={validateInputs()}
        >
          Aceptar
        </button>
        <button type="button" onClick={goBack} className="button button-cancel">
          Cancelar
        </button>
      </form>
    </>
  );
};

ValidateUser.propTypes = {
  onAccept: Proptypes.func.isRequired,
  goBack: Proptypes.func.isRequired
};

export default ValidateUser;
