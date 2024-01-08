import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getCoverageSummary,
  getDetailedInventory,
  getPolicyholderPayouts,
  getPolicySummary,
} from "../../services/ContentsEvaluationService";

const initialState = {
  detailedInventoryListDataFull: [],
  detailedInventoryfetching: true,
  detailedInventoryListAPIData: [],
  coverageSummaryListDataFull: [],
  policyHolderListDataFull: {},
  detailedInventorySummaryData: [],
  policySummaryListDataFull: [],
  searchKeyword: "",
};

export const fetchDetailedInventoryAction = createAsyncThunk(
  "detailedInventory/fetchData",
  async (param: { pageNo: number; recordPerPage: number; claimNum: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getDetailedInventory(param, true);
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
    try {
      const res = await getCoverageSummary(payload, true);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPolicyHolderTableAction = createAsyncThunk(
  "policyholder/fetchData",
  async (payload: { claimNumber: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getPolicyholderPayouts(payload, true);

      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchPolicySummaryTableAction = createAsyncThunk(
  "policysummary/fetchData",
  async (payload: { claimNumber: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getPolicySummary(payload, true);
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
      state.detailedInventoryfetching = true;
      state.detailedInventoryListDataFull = [];
    });
    builder.addCase(fetchDetailedInventoryAction.fulfilled, (state, action) => {
      const payload = action.payload;
      state.detailedInventoryfetching = false;
      if (payload?.status === 200) {
        state.detailedInventorySummaryData = payload?.data.inventorySummary;
        state.detailedInventoryListDataFull = payload?.data.claimItemsDetails;
        state.detailedInventoryListAPIData = payload?.data.claimItemsDetails;
      }
    });
    builder.addCase(fetchDetailedInventoryAction.rejected, (state) => {
      state.detailedInventoryfetching = false;
      state.detailedInventoryListDataFull = initialState.detailedInventoryListDataFull;
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
    builder.addCase(fetchCoverageSummaryAction.rejected, (state) => {
      state.coverageSummaryListDataFull = initialState.coverageSummaryListDataFull;
    });
    builder.addCase(fetchPolicyHolderTableAction.pending, (state) => {
      state.policyHolderListDataFull = {};
    });
    builder.addCase(fetchPolicyHolderTableAction.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload?.status === 200) {
        state.policyHolderListDataFull = payload?.data;
      }
    });
    builder.addCase(fetchPolicyHolderTableAction.rejected, (state) => {
      state.policyHolderListDataFull = initialState.policyHolderListDataFull;
    });
    builder.addCase(fetchPolicySummaryTableAction.pending, (state) => {
      state.policySummaryListDataFull = [];
    });
    builder.addCase(fetchPolicySummaryTableAction.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload?.status === 200) {
        state.policySummaryListDataFull = payload?.data;
      }
    });
    builder.addCase(fetchPolicySummaryTableAction.rejected, (state) => {
      state.policySummaryListDataFull = initialState.policySummaryListDataFull;
    });
  },
});
export default DetailedInventorySlice;

export const { addDetailedInventorySearchKeyWord, updateDetailedInventoryListData } =
  DetailedInventorySlice.actions;
