import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from 'react/redux/actions/usersActions';
import UserPortal from '../UserPortal';

const CreateUser = () => {
  const [showPortal, setShowPortal] = useState(false);
  const dispatch = useDispatch();

  const handleButton = e => {
    e.preventDefault();
    setShowPortal(true);
  };

  const onClose = () => {
    setShowPortal(false);
  };

  const onAccept = user => {
    dispatch(createUser(user));
    onClose();
  };

  return (
    <>
      <button type="button" onClick={handleButton}>
        Crear Usuario
      </button>
      {showPortal && <UserPortal onClose={onClose} onAccept={onAccept} />}
    </>
  );
};

export default CreateUser;
