import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchData } from 'react/redux/actions/loginActions';

const DataLoad = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!dataLoaded) dispatch(fetchData());
  }, []);

  if (dataLoaded)
    return (
      <Redirect
        to={{
          pathname: '/ventas',
          state: {
            linked: true
          }
        }}
      />
    );

  return (
    <div className="loader-container">
      <div className="loader">Loading...</div>
      <p>Cargando datos al sistema...</p>
    </div>
  );
};

export default DataLoad;
