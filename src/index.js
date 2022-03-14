import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InvoicesPage from './pages/InvoicesPage';
import InvoiceDetailsPage from './pages/InvoiceDetailsPage';
import DeleteInvoicePage from './pages/DeleteInvoicePage';
import InvoiceFormPage from './pages/InvoiceFormPage';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route index element={<Navigate to='invoices' />} />
            <Route path='invoices' element={<InvoicesPage />}>
              <Route path='new' element={<InvoiceFormPage />} />
            </Route>
            <Route path='invoices/:invoiceId' element={<InvoiceDetailsPage />}>
              <Route path='edit' element={<InvoiceFormPage />} />
              <Route path='delete' element={<DeleteInvoicePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
