import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import rootReducer from './store/reducers';
import { createStore } from 'redux';

let store = createStore(rootReducer)

// Wrap react components with redux Provider
// This makes the redux store available globally to all the components within the react App component
ReactDOM.render(<Provider store={store}>
  <App />
</Provider>,
  document.getElementById('root')
);