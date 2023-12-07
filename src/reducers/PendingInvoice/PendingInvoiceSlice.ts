import { TABLE_LIMIT_20 } from "@/constants/constants";
import { fetchPendingInvoice } from "@/services/ClaimService";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingInvoiceListData: [],
  currentPageNumber: -1,
  totalinvoice: 0,
  searchKeyword: "",
  claimErrorMsg: "",
  isFetchingPendingInvoice: false,
  sortBy: "createDate",
  orderBy: "desc",
  // totalPageSize: 0,
};

export const handlePendingInvoicePagination = createAsyncThunk(
  "pendingInvoice/paginate",
  async ({ pageNumber }: { pageNumber: number }, api) => {
    const state = api.getState() as RootState;
    const rejectWithValue = api.rejectWithValue;
    try {
      const userId = state.session.userId;
      const sortBy = state.pendingInvoice.sortBy;
      const orderBy = state.pendingInvoice.orderBy;
      const searchKeyword = state.pendingInvoice.searchKeyword;
      api.dispatch(updatePendingInvoice({ sortBy }));
      const res = await fetchPendingInvoice(
        {
          userId,
          pageNumber,
          sortBy,
          orderBy,
          searchKeyword,
          limit: TABLE_LIMIT_20,
        },
        true
      );
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const handlePendingInvoiceSearch = createAsyncThunk(
  "pendingInvoice/search",
  async ({ searchKeyword }: { searchKeyword: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    const state = api.getState() as RootState;
    try {
      const userId = state.session.userId;
      const sortBy = initialState.sortBy;
      const orderBy = initialState.orderBy;
      const pageNumber = 1;
      api.dispatch(
        updatePendingInvoice({
          searchKeyword,
          sortBy,
          orderBy,
        })
      );
      const res = await fetchPendingInvoice(
        {
          userId,
          pageNumber,
          sortBy,
          orderBy,
          searchKeyword,
          limit: TABLE_LIMIT_20,
        },
        true
      );
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

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
        // state.totalPageSize = Math.ceil(data.totalinvoice / data.totalPageSize);
        state.claimErrorMsg = initialState.claimErrorMsg;
      }
      return state;
    },
    updatePendingInvoice(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(handlePendingInvoicePagination.pending, (state) => {
      state.isFetchingPendingInvoice = true;
    });
    builder.addCase(handlePendingInvoicePagination.fulfilled, (state, action) => {
      state.isFetchingPendingInvoice = false;
      PendingInvoiceSlice.caseReducers.addPendingInvoice(state, action);
    });
    builder.addCase(handlePendingInvoicePagination.rejected, (state) => {
      state.isFetchingPendingInvoice = false;
    });
    builder.addCase(handlePendingInvoiceSearch.pending, (state) => {
      state.isFetchingPendingInvoice = true;
    });
    builder.addCase(handlePendingInvoiceSearch.fulfilled, (state, action) => {
      state.isFetchingPendingInvoice = false;
      PendingInvoiceSlice.caseReducers.addPendingInvoice(state, action);
    });
    builder.addCase(handlePendingInvoiceSearch.rejected, (state) => {
      state.isFetchingPendingInvoice = false;
    });
  },
});
export const { addPendingInvoice, updatePendingInvoice } = PendingInvoiceSlice.actions;
export default PendingInvoiceSlice;

export const isFetchingPendingInvoiceSelector = (state: RootState) =>
  state.pendingInvoice.isFetchingPendingInvoice;
