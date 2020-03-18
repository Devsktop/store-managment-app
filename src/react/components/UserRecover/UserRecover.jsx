import React, { useState } from 'react';
import { useHistory, useLocation, Redirect } from 'react-router-dom';
import ValidateUser from './ValidateUser';
import AnswerQuestion from './AnswerQuestion';
import ChangePassword from './ChangePassword';

const UserRecover = () => {
  const [validUser, setValidUser] = useState(false);
  const [userQuestion, setUserQuestion] = useState(null);
  const [validAnswer, setValidAnswer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  if (location.state) {
    if (!location.state.fromLogin) return <Redirect to="/user" />;
  }

  const goBack = () => {
    history.push('/login');
  };

  const handleValidateUser = userQuestionP => {
    setUserQuestion(userQuestionP);
    setValidUser(true);
  };

  const handleValidateAnswer = () => {
    setValidAnswer(true);
  };

  const render = () => {
    if (!validUser)
      return <ValidateUser onAccept={handleValidateUser} goBack={goBack} />;
    if (!validAnswer)
      return (
        <AnswerQuestion
          onAccept={handleValidateAnswer}
          userQuestion={userQuestion}
          goBack={goBack}
        />
      );

    return <ChangePassword goBack={goBack} id={userQuestion.id} />;
  };

  return <div className="container recover">{render()}</div>;
};

export default UserRecover;
