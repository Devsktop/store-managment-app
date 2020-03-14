import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { login } from 'react/redux/actions/loginActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const avoidSpaces = value => {
    if (value.endsWith(' ')) return false;
    return true;
  };

  const handleUser = e => {
    if (avoidSpaces(e.target.value)) setUser(e.target.value);
  };
  const handlePass = e => {
    if (avoidSpaces(e.target.value)) setPass(e.target.value);
  };

  const validateInputs = () => {
    if (user.length === 0 || pass.length === 0) return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userLog = { user, pass };
    dispatch(login(userLog));
  };
  return (
    <div className="login">
      <h2 className="login-title">Iniciar Sesión</h2>
      <FontAwesomeIcon icon={faUser} className="login-icon" />
      <form className="sweet-form" onSubmit={handleSubmit}>
        <label htmlFor="user">
          Usuario:
          <input type="input" onChange={handleUser} value={user} />
        </label>
        <label htmlFor="pass">
          Contraseña:
          <input type="password" onChange={handlePass} value={pass} />
        </label>
        <button
          type="submit"
          className="button button-large button-accept"
          disabled={validateInputs()}
        >
          Aceptar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
