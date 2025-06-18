import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import {Toaster} from "react-hot-toast"
// import { Provider } from 'react-redux';
// import store from './Redux/store.js';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
    <BrowserRouter>
    <Toaster />
      <App />
    </BrowserRouter>
    {/* </Provider> */}
    
  </React.StrictMode>
);