import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoicesSlice';

const store = configureStore({
  reducer: { invoices: invoicesSlice.reducer },
});

export default store;
