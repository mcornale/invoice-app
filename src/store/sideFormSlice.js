import { createSlice } from '@reduxjs/toolkit';

const sideFormSlice = createSlice({
  name: 'sideForm',
  initialState: {
    isNewInvoiceFormVisible: false,
    isEditInvoiceFormVisible: false,
  },
  reducers: {
    showNewInvoiceForm: (state) => {
      if (!state.isNewInvoiceFormVisible) state.isNewInvoiceFormVisible = true;
    },
    hideNewInvoiceForm: (state) => {
      if (state.isNewInvoiceFormVisible) state.isNewInvoiceFormVisible = false;
    },
    showEditInvoiceForm: (state) => {
      if (!state.isEditInvoiceFormVisible)
        state.isEditInvoiceFormVisible = true;
    },
    hideEditInvoiceForm: (state) => {
      if (state.isEditInvoiceFormVisible)
        state.isEditInvoiceFormVisible = false;
    },
  },
});

export const {
  showNewInvoiceForm,
  hideNewInvoiceForm,
  showEditInvoiceForm,
  hideEditInvoiceForm,
} = sideFormSlice.actions;

export default sideFormSlice;
