import React from 'react';
import Swal from 'sweetalert2';

const { ipcRenderer } = window;

const BackUp = () => {
  const createBackUp = e => {
    e.preventDefault();
    window.postMessage({
      type: 'select-dirs'
    });
  };

  const selectBackUp = e => {
    e.preventDefault();
    window.postMessage({
      type: 'select-file'
    });
  };

  ipcRenderer.on('file', (event, ruta) => {
    console.log(ruta);
    if (ruta) {
      Swal.fire({
        title: 'Restaurando datos',
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
          icon: 'icon-class',
          title: 'title-class'
        },
        onOpen: () => {
          Swal.showLoading();

          const url = 'http://localhost:3500/api/tasks/Restore';
          const config = {
            method: 'POST',
            body: JSON.stringify({ ruta }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
          return fetch(url, config)
            .then(res => res.json())
            .then(res => {
              if (res.status === 'ok') {
                Swal.hideLoading();
                Swal.fire({
                  title: 'Los datos han sido restaurados con éxito',
                  text: '',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  customClass: {
                    icon: 'icon-class',
                    title: 'title-class'
                  }
                });
              } else {
                Swal.hideLoading();
                Swal.showValidationMessage('Ha ocurrido un error');
              }
            })
            .catch(() => {
              Swal.hideLoading();
              Swal.showValidationMessage('Ha ocurrido un error');
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
        allowEscapeKey: () => !Swal.isLoading()
      });
    }
  });

  ipcRenderer.on('folder', (event, ruta) => {
    if (ruta) {
      Swal.fire({
        title: 'Creando respaldo',
        showCancelButton: false,
        showConfirmButton: false,
        customClass: {
          icon: 'icon-class',
          title: 'title-class'
        },
        onOpen: () => {
          Swal.showLoading();

          const url = 'http://localhost:3500/api/tasks/Backup';
          const config = {
            method: 'POST',
            body: JSON.stringify({ ruta }),
            headers: {
              'Content-Type': 'application/json'
            }
          };
          return fetch(url, config)
            .then(res => res.json())
            .then(res => {
              if (res.status === 'ok') {
                Swal.hideLoading();
                Swal.fire({
                  title: 'El respaldo ha sido creado con éxito',
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
    }
  });

  return (
    <div className="backup">
      <h2 className="maintenance-title">Respaldar o restaurar datos</h2>
      <div className="maintenance-button-box">
        <button type="button" onClick={createBackUp}>
          Respaldar Datos
        </button>
        <button type="button" onClick={selectBackUp}>
          Restaurar Datos
        </button>
      </div>
    </div>
  );
};

export default BackUp;
