import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { createConfigureStore, history } from 'redux/configureStore'

const { store } = createConfigureStore();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App history={history} dispatch={store.dispatch} />
  </Provider>
);
