import { createSlice } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    isLoadingInvoices: false,
    isInvoiceListFetched: false,
    invoiceList: null,
  },
  reducers: {
    setInvoices: (state, action) => {
      const { newInvoiceList } = action.payload;
      state.invoiceList = newInvoiceList;
      state.isLoadingInvoices = false;
      state.isInvoiceListFetched = true;
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
    const newInvoiceList = [];
    querySnapshot.docs.forEach((doc) => {
      newInvoiceList.push({ id: doc.id, ...doc.data() });
    });
    dispatch(setInvoices({ newInvoiceList: newInvoiceList }));
  });
};

export const createOrUpdateInvoice = (invoice) => async () => {
  const invoiceId = invoice.id;
  delete invoice.id;
  await setDoc(doc(db, 'invoices', invoiceId), invoice);
};

export const deleteInvoice = (invoiceId) => async () => {
  await deleteDoc(doc(db, 'invoices', invoiceId));
};

export const getInvoiceById = (state, invoiceId) =>
  state.invoices.invoiceList?.find((invoice) => invoice.id === invoiceId);
