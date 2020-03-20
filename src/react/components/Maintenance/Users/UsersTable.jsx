import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { DataTable } from 'react-pulpo';
import { deleteUser, editeUser } from 'react/redux/actions/usersActions';
import UserPortal from '../UserPortal';

const UsersTable = () => {
  const users = useSelector(state => state.users.users);
  const [showPortal, setShowPortal] = useState(false);
  const [userId, setUserId] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const usersData = Object.keys(users).map(key => users[key]);

  const HandleDeleteUser = id => {
    if (users[id].admin === 'SUPER_ADMIN') {
      Swal.fire({
        icon: 'error',
        title: 'El super administrador no puede ser eliminado',
        confirmButtonText: 'Continuar',
        customClass: {
          icon: 'icon-class',
          title: 'title-class'
        }
      });
    } else {
      dispatch(deleteUser(id));
    }
  };
  const handleUpdateUser = id => {
    if (users[id].admin === 'SUPER_ADMIN') {
      Swal.fire({
        icon: 'error',
        title: 'El super administrador no puede ser modificado',
        confirmButtonText: 'Continuar',
        customClass: {
          icon: 'icon-class',
          title: 'title-class'
        }
      });
    } else {
      setShowPortal(true);
      setUserId(id);
    }
  };

  const onClose = () => {
    setShowPortal(false);
  };

  const onAccept = user => {
    dispatch(editeUser(user));
    onClose();
  };

  const goBack = () => {
    history.push({
      pathname: '/mantenimiento',
      state: {
        linked: true
      }
    });
  };

  return (
    <div className="container users-table">
      <div className="users-table-contianer">
        <DataTable
          properties={['Usuarios', 'Permisos']}
          data={usersData}
          deleteRow={HandleDeleteUser}
          updateRow={handleUpdateUser}
        />
        <button type="button" className="button button-cancel" onClick={goBack}>
          Volver
        </button>
      </div>
      {showPortal && (
        <UserPortal user={userId} onClose={onClose} onAccept={onAccept} />
      )}
    </div>
  );
};

export default UsersTable;
