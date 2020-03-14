import Swal from 'sweetalert2';

export const CREATE_USER = 'CREATE_USER';

const createUserAction = user => ({
  type: CREATE_USER,
  payload: { user }
});

export const createUser = user => {
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
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
            const newUser = { ...user };
            // DO NOT SEND PASS TO STORE, ONLY TO DB
            delete newUser.pass;
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

export const editeUser = user => {
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
        // PARA SIMULAR BDD, CAMBIAR LUEGO POR EL FETCH
        const newUser = { ...user };
        delete newUser.pass;
        return new Promise(resolve => setTimeout(resolve, 3000))
          .then(() => {
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
    // HACER FETCH A LA BDD

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
        return new Promise(resolve => setTimeout(resolve, 3000));
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then(result => {
      if (result.value) {
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
