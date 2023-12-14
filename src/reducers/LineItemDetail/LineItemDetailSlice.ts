import { WEB_SEARCH_ENGINES } from "@/constants/constants";
import { unknownObjectType } from "@/constants/customTypes";
import {
  fetchClaimItemDetails,
  fetchComparable,
} from "@/services/AdjusterMyClaimServices/LineItemDetailService";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  isLoading: true,
  isFetching: false,
  lineItem: {},
  webSearch: {
    isSearching: false,
    insuredPrice: 0,
    priceFrom: 0,
    priceTo: 0,
    searchKey: "",
    searchList: [],
    noFurtherData: false,
    selectedEngine: WEB_SEARCH_ENGINES.filter((engine) => engine.default)[0],
  },
};

export const fetchLineItemDetail = createAsyncThunk(
  "lineItem/fetchLineItem",
  async ({ itemId }: { itemId: number }, api) => {
    const rejectWithValue = api.rejectWithValue;
    const dispatch = api.dispatch;
    const state = api.getState() as RootState;
    try {
      const res = await fetchClaimItemDetails({ itemId }, true);
      if (res.status === 200) {
        const insuredPrice = res.data.insuredPrice;
        const searchKey = res.data.description;
        if (!state.lineItemDetail?.webSearch?.isSearching)
          dispatch(searchComparable({ insuredPrice, searchKey }));
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const searchComparable = createAsyncThunk(
  "comparable/search",
  async (payload: { insuredPrice: number; searchKey: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    const dispatch = api.dispatch;
    try {
      console.log("fetching comparable>>>>", payload);
      dispatch(updateWebsearch(payload));
      const res = await fetchComparable(
        {
          item: "xyz",
          id: "1",
          numberOfCounts: 10,
          priceFrom: 0,
          pincode: 11111,
          pageNo: 1,
          serfWowSearch: true,
          ids: [1],
        },
        true
      );
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const LineItemDetailSlice = createSlice({
  initialState,
  name: "lineItemDetail",
  reducers: {
    resetLineItemDetail() {
      return initialState;
    },
    updateWebsearch(state, action) {
      const payload = action.payload;
      const { insuredPrice, searchKey, selectedEngine } = payload;
      let priceFrom = 0;
      let priceTo = 0;
      if (selectedEngine) {
        state.webSearch.selectedEngine = selectedEngine;
      }
      if (insuredPrice) {
        const range = +insuredPrice * 0.2;
        priceFrom = +insuredPrice - range;
        priceTo = +insuredPrice + range;
      }
      state.webSearch = {
        ...state.webSearch,
        priceFrom,
        priceTo,
        insuredPrice,
        searchKey,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLineItemDetail.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(fetchLineItemDetail.fulfilled, (state, action) => {
      const { payload } = action;
      state.isFetching = false;
      state.isLoading = false;
      if (payload.status === 200) {
        state.lineItem = payload.data;
      }
    });
    builder.addCase(fetchLineItemDetail.rejected, (state) => {
      state.isFetching = false;
      state.isLoading = false;
      state.lineItem = initialState.lineItem;
    });
    builder.addCase(searchComparable.pending, (state) => {
      state.webSearch.isSearching = true;
      state.webSearch.noFurtherData = false;
    });
    builder.addCase(searchComparable.fulfilled, (state, action) => {
      state.webSearch.isSearching = false;
      const payload = action.payload;
      console.log("=========", payload);
      if (payload.status === 200) {
        state.webSearch.searchList = payload.data?.searchResults ?? [];
        if (!payload?.data) {
          state.webSearch.noFurtherData = true;
        }
      }
    });
    builder.addCase(searchComparable.rejected, (state) => {
      state.webSearch.isSearching = false;
    });
  },
});

export default LineItemDetailSlice;
export const { resetLineItemDetail, updateWebsearch } = LineItemDetailSlice.actions;
