import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { getSelectVendor } from "@/services/ClaimService";

interface AddItemsTableState {
  addItemsTableData: any[];
  selectedItems: any[];
  isAnyItemSelected: boolean;
  selectedRows: any[];
  categories: any[];
  selectedCategory: string;
  searchKeyword: string;
  categoryRows: any[];
  previousSelectedItems: any[];
  vendors: any[];
  vendorInventoryListAPIData: any;
  vendorInventoryListDataFull: any[];
  vendorInventoryfetching: boolean;
  vendorInventorySummaryData: any[];
}

const initialState: AddItemsTableState = {
  addItemsTableData: [],
  selectedItems: [],
  isAnyItemSelected: false,
  selectedRows: [],
  categories: [],
  selectedCategory: "",
  searchKeyword: "",
  categoryRows: [],
  previousSelectedItems: [],
  vendorInventoryfetching: true,
  vendorInventorySummaryData: [],
  vendorInventoryListAPIData: null,
  vendorInventoryListDataFull: [],
  vendors: [],
};

export const fetchVendorInventoryAction = createAsyncThunk(
  "vendorInventory/fetchData",
  async (param: { pageNo: number; recordPerPage: number }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getSelectVendor(param, true);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    deleteCategoryListItem: (state, action: PayloadAction<any>) => {
      const itemIdToDelete = action.payload.id;
      state.addItemsTableData = state.addItemsTableData.filter(
        (item) => item.id !== itemIdToDelete
      );
    },
    setVendors: (state, action: PayloadAction<any[]>) => {
      state.vendors = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchVendorInventoryAction.pending, (state) => {
      state.vendorInventoryfetching = true;
      state.vendorInventoryListDataFull = [];
    });
    builder.addCase(fetchVendorInventoryAction.fulfilled, (state, action) => {
      const payload = action.payload;
      console.log("API Responsessssssssss", payload);
      state.vendorInventoryfetching = false;
      if (payload?.status === 200) {
        state.vendorInventorySummaryData = payload?.data.comapanyVendors;
        state.vendorInventoryListDataFull = payload?.data.companyVendors;
        state.vendorInventoryListAPIData = payload?.data.companyVendors;
      }
    });
    builder.addCase(fetchVendorInventoryAction.rejected, (state) => {
      state.vendorInventoryfetching = false;
      state.vendorInventoryListDataFull = initialState.vendorInventoryListDataFull;
    });
  },
});

export const {
  setAddItemsTableData,
  setSelectedItems,
  setSelectedRows,
  setSearchKeyword,
  deleteCategoryListItem,
  setCategoryRows,
  setCategories,
  setSelectedCategory,
  setVendors,
} = AddItemsTableCSVSlice.actions;
export default AddItemsTableCSVSlice;
