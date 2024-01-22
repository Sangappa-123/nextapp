import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiptMapperPdfList: [],
  selectedPdfName: "",
  selectedPdfFileUrl: "",
};

const ReceiptMapperSlice = createSlice({
  initialState,
  name: "receiptMapper",
  reducers: {
    receiptMapperDate(state, action) {
      const { payload } = action;
      const { receiptMapperPdf } = payload;

      state.receiptMapperPdfList = receiptMapperPdf.data;
    },
    addSelectedFile(state, action) {
      const { payload } = action;
      const { fileUrl, fileName } = payload;

      state.selectedPdfFileUrl = fileUrl;
      state.selectedPdfName = fileName;
    },
  },
});
export default ReceiptMapperSlice;

export const { receiptMapperDate, addSelectedFile } = ReceiptMapperSlice.actions;
