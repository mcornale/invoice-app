import { configureStore } from '@reduxjs/toolkit';
import invoicesSliceReducer from './invoicesSlice';

const store = configureStore({
  reducer: { invoices: invoicesSliceReducer },
});

export default store;
