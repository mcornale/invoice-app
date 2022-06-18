import { createSlice } from '@reduxjs/toolkit';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from 'firebase/firestore';
import INVOICES_STATUSES from '../constants/invoices-statuses';
import { db } from '../firebase';
import { Invoice } from '../types/invoice';
import { AppDispatch, RootState } from './store';

type InitialState = {
  isLoadingInvoices: boolean;
  isInvoiceListFetched: boolean;
  invoiceList: Invoice[] | null;
  invoiceListFilters: string[];
};

const invoicesSlice = createSlice({
  name: 'invoices',
  initialState: {
    isLoadingInvoices: false,
    isInvoiceListFetched: false,
    invoiceList: null,
    invoiceListFilters: Object.values(INVOICES_STATUSES),
  } as InitialState,
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
    setInvoiceListFilters: (state, action) => {
      const { newInvoiceListFilters } = action.payload;
      state.invoiceListFilters = newInvoiceListFilters;
    },
  },
});

export const { setInvoices, setLoading, setInvoiceListFilters } =
  invoicesSlice.actions;

export default invoicesSlice;

export const fetchInvoices = () => (dispatch: AppDispatch) => {
  dispatch(setLoading());
  onSnapshot(collection(db, 'invoices'), (querySnapshot) => {
    const newInvoiceList: Invoice[] = [];
    querySnapshot.docs.forEach((doc) => {
      newInvoiceList.push({ id: doc.id, ...doc.data() } as Invoice);
    });
    dispatch(setInvoices({ newInvoiceList: newInvoiceList }));
  });
};

export const createOrUpdateInvoice = (invoice: Invoice) => async () => {
  const { id: invoiceId, ...invoiceData } = invoice;
  await setDoc(doc(db, 'invoices', invoiceId), invoiceData);
};

export const deleteInvoice = (invoiceId: string) => async () => {
  await deleteDoc(doc(db, 'invoices', invoiceId));
};

export const getInvoiceById = (
  state: RootState,
  invoiceId: string | undefined
) =>
  invoiceId
    ? state.invoices.invoiceList?.find(
        (invoice: Invoice) => invoice.id === invoiceId
      )
    : null;
