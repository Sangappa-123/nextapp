import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCoverageSummary,
  getDetailedInventory,
} from "../../services/ContentsEvaluationService";

const initialState = {
  detailedInventoryListDataFull: [],
  detailedInventoryListAPIData: [],
  coverageSummaryListDataFull: [],
  detailedInventorySummaryData: [],
  searchKeyword: "",
};

export const fetchDetailedInventoryAction = createAsyncThunk(
  "detailedInventory/fetchData",
  async (param: { pageNo: number; recordPerPage: number; claimNum: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    console.log("coveragej");
    try {
      const res = await getDetailedInventory(param, true);
      console.log("coverage k", res);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCoverageSummaryAction = createAsyncThunk(
  "coverageSummary/fetchData",
  async (payload: { claimNumber: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    console.log("coverage444");
    try {
      const res = await getCoverageSummary(payload, true);
      console.log("coverage k", res);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const DetailedInventorySlice = createSlice({
  initialState,
  name: "detailedInventorydata",
  reducers: {
    addDetailedInventorySearchKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
    updateDetailedInventoryListData(state, action) {
      const { payload } = action;
      const { detailedInventoryListData } = payload;
      state.detailedInventoryListDataFull = detailedInventoryListData;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDetailedInventoryAction.pending, (state) => {
      state.detailedInventoryListDataFull = [];
    });
    builder.addCase(fetchDetailedInventoryAction.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload?.status === 200) {
        state.detailedInventorySummaryData = payload?.data.inventorySummary;
        state.detailedInventoryListDataFull = payload?.data.claimItemsDetails;
        state.detailedInventoryListAPIData = payload?.data.claimItemsDetails;
      }
    });
    builder.addCase(fetchCoverageSummaryAction.pending, (state) => {
      state.coverageSummaryListDataFull = [];
    });
    builder.addCase(fetchCoverageSummaryAction.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload?.status === 200) {
        state.coverageSummaryListDataFull = payload?.data;
      }
    });
  },
});
export default DetailedInventorySlice;

export const { addDetailedInventorySearchKeyWord, updateDetailedInventoryListData } =
  DetailedInventorySlice.actions;
