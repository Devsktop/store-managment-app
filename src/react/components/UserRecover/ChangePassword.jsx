/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router-dom';
import Proptypes from 'prop-types';

const ChangePassword = ({ goBack, id }) => {
  const [pass, setPass] = useState('');
  const [repeatPass, setRepeatPass] = useState('');
  const history = useHistory();

  const noSpace = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handlePass = e => {
    if (noSpace(e.target.value)) setPass(e.target.value);
  };

  const handleRepeatPass = e => {
    if (noSpace(e.target.value)) setRepeatPass(e.target.value);
  };

  const validateInputs = () => {
    if (pass === '' || repeatPass === '' || pass !== repeatPass) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    Swal.fire({
      title: 'Cambiando contraseña',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const url = 'http://localhost:3500/api/tasks/actPass';
        const config = {
          method: 'POST',
          body: JSON.stringify({ C_user: id, pass }),
          headers: {
            'Content-Type': 'application/json'
          }
        };

        fetch(url, config)
          .then(res => res.json())
          .then(({ status }) => {
            Swal.hideLoading();
            if (status === 'ok') {
              Swal.fire({
                title: 'Su contraseña se ha cambiado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              }).then(() => history.push('/login'));
            } else if (status === 'error') {
              Swal.showValidationMessage('Ha ocurrido un error');
            }
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };

  return (
    <>
      <h2 className="login-title">Cambio de contraseña</h2>
      <FontAwesomeIcon icon={faTools} className="login-icon" />
      <form className="sweet-form" onSubmit={handleSubmit}>
        <label htmlFor="pass">
          Nueva Contraseña:
          <input type="password" onChange={handlePass} value={pass} />
        </label>
        <label htmlFor="pass">
          Repetir Contraseña:
          <input
            type="password"
            onChange={handleRepeatPass}
            value={repeatPass}
          />
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

ChangePassword.propTypes = {
  goBack: Proptypes.func.isRequired,
  id: Proptypes.number.isRequired
};

export default ChangePassword;
