import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddItemsTableState {
  addItemsTableData: any[];
  selectedItems: any[];
  isAnyItemSelected: boolean;
  selectedRows: any[];
  categoryRows: any[];
  categories: any[];
  selectedCategory: string;
}

const initialState: AddItemsTableState = {
  addItemsTableData: [],
  selectedItems: [],
  isAnyItemSelected: false,
  selectedRows: [],
  categoryRows: [],
  categories: [],
  selectedCategory: "",
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
      state.selectedRows = [...state.selectedRows, ...action.payload];
    },
    setCategoryRows: (state, action: PayloadAction<any[]>) => {
      state.categoryRows = [...action.payload];
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedRows,
  setCategoryRows,
  setCategories,
  setSelectedCategory,
} = AddItemsTableCSVSlice.actions;
export default AddItemsTableCSVSlice;
