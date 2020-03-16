/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import PropTypes from 'prop-types';

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

const permissions = [
  { value: 'ADMIN', label: 'Supervisor' },
  { value: 'NORMAL', label: 'Encargado' }
];

const questions = [
  { value: 0, label: '¿Cuál es el segundo apellido de tu padre?' },
  { value: 1, label: '¿Cuál fue el nombre de tu primera mascota?' },
  { value: 2, label: '¿Cuál es la marca de tu vehículo?' },
  { value: 3, label: '¿Cuál es el nombre de tu primera pareja?' },
  { value: 4, label: '¿Cuál es tu plato favorito?' }
];

const UserPortal = ({ user, onClose, onAccept }) => {
  const selectedUser = useSelector(state => state.users.users[user]);

  const defaultPermissions = selectedUser
    ? {
        value: selectedUser.admin,
        label: selectedUser.admin === 'ADMIN' ? 'Supervisor' : 'Encargado'
      }
    : permissions[1];

  const [userName, setUserName] = useState(
    selectedUser ? selectedUser.user : ''
  );

  const [userPass, setUserPass] = useState('');

  const [userPassConfirm, setUserPassConfirm] = useState('');

  const [permissionsSelect, setPermissionsSelect] = useState(
    selectedUser ? selectedUser.admin : 'NORMAL'
  );

  const [questionSelect, setQuestionSelect] = useState(0);

  const [answer, setAnswer] = useState('');

  const avoidSpaces = e => {
    if (e.endsWith(' ')) return false;
    return true;
  };

  const handleUserName = e => {
    if (avoidSpaces(e.target.value)) setUserName(e.target.value);
  };

  const handleUserPass = e => {
    if (avoidSpaces(e.target.value)) setUserPass(e.target.value);
  };

  const handleUserPassConfirm = e => {
    if (avoidSpaces(e.target.value)) setUserPassConfirm(e.target.value);
  };

  const handleUserAnswer = e => {
    if (avoidSpaces(e.target.value)) setAnswer(e.target.value);
  };

  const handlePermissionsSelect = ({ value }) => {
    setPermissionsSelect(value);
  };
  const handleQuestionSelect = ({ value }) => {
    setQuestionSelect(value);
  };

  const disableAccept = () => {
    if (!selectedUser && userPass === '') return true;
    if (!selectedUser && answer === '') return true;
    if (userName.trim() !== '' && userPass === userPassConfirm) return false;
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();

    const newUser = {
      user: userName,
      pass: userPass,
      admin: permissionsSelect,
      question: questions[questionSelect],
      answer,
      id: selectedUser ? selectedUser.id : null
    };

    onAccept(newUser);
  };

  return ReactDOM.createPortal(
    <div className="portal">
      <div className="portal-box">
        <form className="sweet-form" onSubmit={handleSubmit}>
          <label htmlFor="userName">
            Ingrese nombre de usuario:
            <input type="input" onChange={handleUserName} value={userName} />
          </label>
          <label htmlFor="permissions">
            Selecione permisos de usuarios:
            <Select
              options={permissions}
              isSearchable={false}
              styles={customStyles}
              defaultValue={defaultPermissions}
              onChange={handlePermissionsSelect}
            />
          </label>
          {!selectedUser && (
            <>
              <label htmlFor="userPass">
                Ingrese constraseña:
                <input
                  type="password"
                  onChange={handleUserPass}
                  value={userPass}
                />
              </label>
              <label htmlFor="userPassConfirm">
                Ingrese constraseña nuevamente:
                <input
                  type="password"
                  onChange={handleUserPassConfirm}
                  value={userPassConfirm}
                />
              </label>
              <label htmlFor="questions">
                Selecione una pregunta secreta:
                <Select
                  options={questions}
                  isSearchable={false}
                  styles={customStyles}
                  defaultValue={questions[0]}
                  onChange={handleQuestionSelect}
                />
              </label>
              <label htmlFor="userAnswer">
                Ingrese su respuesta secreta :
                <input type="text" onChange={handleUserAnswer} value={answer} />
              </label>
            </>
          )}
          <button
            type="submit"
            className="button button-accept"
            disabled={disableAccept()}
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

UserPortal.propTypes = {
  user: PropTypes.number,
  onAccept: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default UserPortal;
