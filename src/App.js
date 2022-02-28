import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Layout/SideBar/SideBar';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';
import { fetchInvoices } from './store/invoicesSlice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
  }, [dispatch]);

  return (
    <>
      <Sidebar />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to='/invoices' />} />
            <Route path='/invoices' element={<HomePage />} />
            <Route path='/invoices/:invoiceId' element={<InvoicePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
};

export default App;
