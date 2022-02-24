import { createSlice } from '@reduxjs/toolkit';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    isLoadingData: false,
    invoicesList: [],
  },
  reducers: {
    setInvoices: (state, action) => {
      const { newInvoicesList } = action.payload;
      state.invoicesList = newInvoicesList;
      state.isLoadingData = false;
    },
    setLoading: (state) => {
      if (!state.isLoadingData) state.isLoadingData = true;
    },
  },
});

export const { setInvoices, setLoading } = invoicesSlice.actions;

export default invoicesSlice;

export const fetchInvoices = () => (dispatch) => {
  dispatch(setLoading());
  onSnapshot(collection(db, 'invoices'), (querySnapshot) => {
    const invoices = [];
    querySnapshot.docs.forEach((doc) => {
      invoices.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setInvoices({ newInvoicesList: invoices }));
  });
};
