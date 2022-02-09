import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:invoiceId' element={<InvoicePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
