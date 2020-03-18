/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { faTools } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Proptypes from 'prop-types';

const AnswerQuestion = ({
  onAccept,
  goBack,
  userQuestion: { user, question, id }
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [answer, setAnswer] = useState('');
  const [answerAtt, setAnswerAtt] = useState(0);

  if (isValidating)
    return (
      <div className="loader-container">
        <div className="loader">Loading...</div>
        <p>Verificando respuesta...</p>
      </div>
    );

  const handleAnswer = e => {
    setAnswer(e.target.value);
  };

  const validateInputs = () => {
    if (answer === '') return true;
    return false;
  };

  const handleSubmit = e => {
    e.preventDefault();
    setIsValidating(true);
    const url = 'http://localhost:3500/api/tasks/verificarUser2';
    const config = {
      method: 'POST',
      body: JSON.stringify({ userid: id, resp: answer }),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(url, config)
      .then(res => res.json())
      .then(({ userdata }) => {
        // Validating answer in DB
        // If answer is wrong
        if (userdata.Aux === 'Respuesta_Invalida') {
          // If true will not block yet
          if (answerAtt < 2) {
            Swal.fire({
              title: 'La repuesta es incorrecta',
              text: '',
              icon: 'error',
              confirmButtonText: 'Continuar',
              customClass: {
                icon: 'icon-class',
                title: 'title-class'
              }
            });
            setAnswerAtt(c => c + 1);
          } else {
            // If this is the third attempt and answer is wrong will block the screen
            let timerInterval;
            Swal.fire({
              title: 'Respuesta incorrecta!',
              icon: 'error',
              html: 'Debe esperar <b></b> segundos.',
              customClass: {
                content: 'content-class',
                title: 'title-class'
              },
              timer: 10000,
              timerProgressBar: true,
              onBeforeOpen: () => {
                Swal.showLoading();
                timerInterval = setInterval(() => {
                  const content = Swal.getContent();
                  if (content) {
                    const b = content.querySelector('b');
                    if (b) {
                      b.textContent = parseInt(Swal.getTimerLeft() / 1000, 10);
                    }
                  }
                }, 1000);
              },
              onClose: () => {
                clearInterval(timerInterval);
              },
              allowOutsideClick: () => !Swal.isLoading()
            }).then(() => {
              setAnswerAtt(0);
            });
          }
          setIsValidating(false);
        } else if (userdata.Aux === 'Respuesta_Valida') {
          // If answer is right will execute onAccept porp func
          onAccept();
        }
      });
  };

  return (
    <>
      <h2 className="login-title">Recuperación de usuario</h2>
      <FontAwesomeIcon icon={faTools} className="login-icon" />
      <form className="sweet-form" onSubmit={handleSubmit}>
        <label>Usuario: {user}</label>
        <label htmlFor="">{question}</label>
        <label htmlFor="answer">
          Ingrese su respuesta:
          <input type="input" onChange={handleAnswer} value={answer} />
        </label>
        <button
          type="submit"
          className="button button-accept"
          disabled={validateInputs()}
        >
          Aceptar
        </button>
        <button type="button" onClick={goBack} className="button button-cancel">
          Cancelar
        </button>
      </form>
    </>
  );
};

AnswerQuestion.propTypes = {
  onAccept: Proptypes.func.isRequired,
  goBack: Proptypes.func.isRequired,
  userQuestion: Proptypes.object.isRequired
};

export default AnswerQuestion;
