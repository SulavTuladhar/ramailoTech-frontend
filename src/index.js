import React from 'react';
import ReactDOM from 'react-dom/client';
import { router } from './AppRouting';
import { ToastContainer } from 'react-toastify';
import { CookiesProvider } from 'react-cookie';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <ToastContainer />
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  </>
);

