import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import "@styles/index.scss";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'features/store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>

);

reportWebVitals();
