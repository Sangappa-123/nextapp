import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExcelCsvUploadState {
  postLossItemDetails: [];
  message: string;
  status: number;
}

const initialState: ExcelCsvUploadState = {
  postLossItemDetails: [],
  message: "",
  status: 0,
};

const ExcelCsvUploadSlice = createSlice({
  name: "excelCsvUpload",
  initialState,
  reducers: {
    setExcelCsvUploadData(state, action: PayloadAction<ExcelCsvUploadState>) {
      state.postLossItemDetails = action.payload.postLossItemDetails;
      state.message = action.payload.message;
      state.status = action.payload.status;
    },
  },
});

export const { setExcelCsvUploadData } = ExcelCsvUploadSlice.actions;
export default ExcelCsvUploadSlice;
