import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddItemsTableState {
  addItemsTableData: any[];
  selectedItems: any[];
  isAnyItemSelected: boolean;
  selectedRows: any[];
  categories: any[];
  selectedCategory: string;
  searchKeyword: string;
}

const initialState: AddItemsTableState = {
  addItemsTableData: [],
  selectedItems: [],
  isAnyItemSelected: false,
  selectedRows: [],
  categories: [],
  selectedCategory: "",
  searchKeyword: "",
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
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    deleteClaimContentListItem: (state, action: PayloadAction<any>) => {
      const itemIdToDelete = action.payload.id;
      state.addItemsTableData = state.addItemsTableData.filter(
        (item) => item.id !== itemIdToDelete
      );
    },
  },
});

export const {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedRows,
  setCategories,
  setSelectedCategory,
  setSearchKeyword,
  deleteClaimContentListItem,
} = AddItemsTableCSVSlice.actions;
export default AddItemsTableCSVSlice;
