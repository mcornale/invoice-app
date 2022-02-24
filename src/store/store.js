import { configureStore } from '@reduxjs/toolkit';
import invoicesSlice from './invoicesSlice';
import sideFormSlice from './sideFormSlice';

const store = configureStore({
  reducer: { invoices: invoicesSlice.reducer, sideForm: sideFormSlice.reducer },
});

export default store;
