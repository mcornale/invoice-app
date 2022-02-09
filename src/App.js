import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';

const App = () => {
  return (
    <>
      <Sidebar />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:invoiceId' element={<InvoicePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
