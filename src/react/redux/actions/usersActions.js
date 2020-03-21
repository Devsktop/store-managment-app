import Swal from 'sweetalert2';

export const CREATE_USER = 'CREATE_USER';

const createUserAction = user => ({
  type: CREATE_USER,
  payload: { user }
});

export const createUser = usern => {
  return dispatch => {
    Swal.fire({
      title: 'Creando usuario',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();
        const { user, pass, admin, question, answer } = usern;
        const url = 'http://localhost:3500/api/tasks/usuario';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            user,
            pass,
            adm: admin,
            preg: question,
            resp: answer
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 'ok') {
              const newUser = { ...usern, id: res.id };
              // DO NOT SEND PASS TO STORE, ONLY TO DB
              delete newUser.pass;
              delete newUser.question;
              delete newUser.answer;
              dispatch(createUserAction(newUser));
              Swal.hideLoading();
              Swal.fire({
                title: 'El usuario se ha registrado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              });
            }
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const UPDATE_USER = 'UPDATE_USER';

const updateUserAction = user => ({
  type: UPDATE_USER,
  payload: { user }
});

export const editeUser = usern => {
  return dispatch => {
    Swal.fire({
      title: 'Modificando usuario',
      showCancelButton: false,
      showConfirmButton: false,
      customClass: {
        icon: 'icon-class',
        title: 'title-class'
      },
      onOpen: () => {
        Swal.showLoading();

        const { user, admin, id } = usern;
        const url = 'http://localhost:3500/api/tasks/actusuario';
        const config = {
          method: 'POST',
          body: JSON.stringify({
            user,
            adm: admin,
            id
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config)
          .then(res => res.json())
          .then(res => {
            if (res.status === 'ok') {
              const newUser = { ...usern };
              delete newUser.pass;
              delete newUser.question;
              delete newUser.answer;
              dispatch(updateUserAction(newUser));
              Swal.hideLoading();
              Swal.fire({
                title: 'El usuario se ha modificado con éxito',
                text: '',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                  icon: 'icon-class',
                  title: 'title-class'
                }
              });
            }
          })
          .catch(() => {
            Swal.showValidationMessage('Ha ocurrido un error');
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
      allowEscapeKey: () => !Swal.isLoading()
    });
  };
};

export const DELETE_USER = 'DELETE_USER';

const deleteUserAction = id => ({
  type: DELETE_USER,
  payload: { id }
});

export function deleteUser(id) {
  return dispatch => {
    Swal.fire({
      title: '¿Seguro que desea eliminar este Usuario?',
      text: '¡No podrás revertir esta acción!',
      icon: 'warning',
      customClass: {
        icon: 'icon-class',
        title: 'title-class',
        content: 'content-class'
      },
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        Swal.getCancelButton().style.display = 'none';
        const url = 'http://localhost:3500/api/tasks/usuario';
        const config = {
          method: 'DELETE',
          body: JSON.stringify({ id }),
          headers: {
            'Content-Type': 'application/json'
          }
        };
        return fetch(url, config).then(res => res.json());
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value.status === 'ok') {
        dispatch(deleteUserAction(id));
        Swal.fire({
          title: '¡Eliminado!',
          text: 'El usuario ha sido eliminado satisfactoriamente',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          customClass: {
            icon: 'icon-class',
            title: 'title-class',
            content: 'content-class'
          }
        });
      }
    });
  };
}

export const FETCH_USERS = 'FETCH_USERS';

const fetchUsersAction = users => ({
  type: FETCH_USERS,
  payload: { users }
});

export const fetchUsers = () => {
  return dispatch => {
    const url = 'http://localhost:3500/api/tasks/usuario';
    return fetch(url)
      .then(res => res.json())
      .then(res => {
        const users = {};

        if (res) {
          res.forEach(user => {
            users[user.Id_Usuario] = {
              id: user.Id_Usuario,
              user: user.Username,
              admin: user.Admin
            };
          });
        }

        console.log(users);
        dispatch(fetchUsersAction(users));
      });
  };
};

export const LOGOUT_USER = 'LOGOUT_USER';
