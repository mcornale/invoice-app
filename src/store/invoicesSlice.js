import { createSlice } from '@reduxjs/toolkit';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    isLoadingInvoices: false,
    invoiceList: null,
  },
  reducers: {
    setInvoices: (state, action) => {
      const { newInvoiceList } = action.payload;
      state.invoiceList = newInvoiceList;
      state.isLoadingInvoices = false;
    },
    setLoading: (state) => {
      if (!state.isLoadingInvoices) state.isLoadingInvoices = true;
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
    dispatch(setInvoices({ newInvoiceList: invoices }));
  });
};

export const getInvoiceById = (state, invoiceId) =>
  state.invoices.invoiceList?.find((invoice) => invoice.id === invoiceId);
