import React from 'react';

// Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import AppRouter from './router/AppRouter';

// Style
import './style.sass';

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
