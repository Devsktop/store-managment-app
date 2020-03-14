import React from 'react';
import { useHistory } from 'react-router-dom';
import CreateUser from './CreateUser';

const Users = () => {
  const history = useHistory();

  const handleUsers = () => history.push('/users');

  return (
    <div className="user-maintenance">
      <h2 className="maintenance-title">Gestión de usuarios</h2>
      <div className="maintenance-button-box">
        <CreateUser />
        <button type="button" onClick={handleUsers}>
          Modificar Usuario
        </button>
      </div>
    </div>
  );
};

export default Users;
