/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import { logOut } from 'react/redux/actions/loginActions';

import {
  faCartPlus,
  faBoxOpen,
  faCalendarAlt,
  faTools,
  faQuestion,
  faDoorOpen
} from '@fortawesome/free-solid-svg-icons';
import NavIconLink from './NavIconLink';

const Navigation = () => {
  const dataLoaded = useSelector(state => state.login.dataLoaded);
  const admin = useSelector(state => state.login.admin);
  const dispatch = useDispatch();
  const history = useHistory();

  const seeMenu = admin === 'SUPER_ADMIN' || admin === 'ADMIN';

  const exit = e => {
    e.preventDefault();
    Swal.fire({
      title: '¿Cerrar sesión?',
      text: '',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Salir',
      cancelButtonText: 'Cancelar',
      preConfirm: () => {
        dispatch(logOut());
        history.push('/login');
      }
    });
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="logo">Vaper&apos;s VE</div>
        {dataLoaded && (
          <ul className="navbar">
            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/ventas',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faCartPlus} text="Ventas" />
              </NavLink>
            </li>
            {seeMenu && (
              <li className="navbar-item">
                <NavLink
                  className="navbar-link"
                  to={{
                    pathname: '/registro',
                    state: {
                      linked: true
                    }
                  }}
                >
                  <NavIconLink icon={faCalendarAlt} text="Registro" />
                </NavLink>
              </li>
            )}
            {seeMenu && (
              <li className="navbar-item">
                <NavLink
                  className="navbar-link"
                  to={{
                    pathname: '/stock',
                    state: {
                      linked: true
                    }
                  }}
                >
                  <NavIconLink icon={faBoxOpen} text="Stock" />
                </NavLink>
              </li>
            )}
            {seeMenu && (
              <li className="navbar-item">
                <NavLink
                  className="navbar-link"
                  to={{
                    pathname: '/mantenimiento',
                    state: {
                      linked: true
                    }
                  }}
                >
                  <NavIconLink icon={faTools} text="Mantenimiento" />
                </NavLink>
              </li>
            )}
            <li className="navbar-item">
              <NavLink
                className="navbar-link"
                to={{
                  pathname: '/ayuda',
                  state: {
                    linked: true
                  }
                }}
              >
                <NavIconLink icon={faQuestion} text="Ayuda" />
              </NavLink>
            </li>
            <li className="navbar-item">
              <a className="navbar-link" href="#" onClick={exit}>
                <NavIconLink icon={faDoorOpen} text="Salir" />
              </a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;