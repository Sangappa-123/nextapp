import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddItemsTableState {
  addItemsTableData: any[];
  selectedItems: any[];
  isAnyItemSelected: boolean;
  selectedRows: any[];
}

const initialState: AddItemsTableState = {
  addItemsTableData: [],
  selectedItems: [],
  isAnyItemSelected: false,
  selectedRows: [],
};

const AddItemsTableCSVSlice = createSlice({
  name: "addItemsTable",
  initialState,
  reducers: {
    setAddItemsTableData: (state, action: PayloadAction<any[]>) => {
      state.addItemsTableData = action.payload;
    },
    setSelectedItems: (state, action: PayloadAction<any[]>) => {
      state.selectedItems = action.payload;
      state.isAnyItemSelected = action.payload.length > 0;
    },
    setSelectedRows: (state, action: PayloadAction<any[]>) => {
      state.selectedRows = action.payload;
    },
  },
});

export const { setAddItemsTableData, setSelectedItems, setSelectedRows } =
  AddItemsTableCSVSlice.actions;
export default AddItemsTableCSVSlice;
