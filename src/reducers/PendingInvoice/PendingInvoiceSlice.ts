import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingInvoiceListData: [],
  currentPageNumber: -1,
  totalinvoice: 0,
  searchKeyword: "",
  claimErrorMsg: "",
  totalPageSize: 0,
};

const PendingInvoiceSlice = createSlice({
  initialState,
  name: "pendingInvoice",
  reducers: {
    addPendingInvoice(state, action) {
      const { payload } = action;
      const { data, message } = payload;
      console.log("==========", payload);
      if (!data) {
        return { ...initialState, claimErrorMsg: message };
      } else {
        state.pendingInvoiceListData = data.invoices;
        state.currentPageNumber = data.currentPageNumber;
        state.totalinvoice = data.totalinvoice;
        state.totalPageSize = data.totalPageSize;
        state.claimErrorMsg = initialState.claimErrorMsg;
      }
      return state;
    },
  },
});
export const { addPendingInvoice } = PendingInvoiceSlice.actions;
export default PendingInvoiceSlice;
