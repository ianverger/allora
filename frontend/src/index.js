import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from "./context/Modal";
import configureStore from './store/store';
import './index.css';
import * as sessionActions from './store/session';
import * as tripActions from './store/trips';
import * as activitiesActions from './store/activities';



const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.sessionActions = sessionActions;
  window.tripActions = tripActions;
}


function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
   </ModalProvider>

  ); 
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);