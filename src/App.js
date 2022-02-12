import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';

const App = () => {
  return (
    <>
      <Sidebar />
      <main>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:invoiceId' element={<InvoicePage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
};

export default App;
