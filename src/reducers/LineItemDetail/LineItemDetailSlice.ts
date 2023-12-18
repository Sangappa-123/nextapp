import { WEB_SEARCH_ENGINES } from "@/constants/constants";
import { unknownObjectType } from "@/constants/customTypes";
import {
  getLineItemCategory,
  getLineItemCondition,
  getLineItemRetailers,
  getLineItemRoom,
  getLineItemSubCategory,
} from "@/services/AdjusterMyClaimServices/LineItemDetailService";
import {
  fetchClaimItemDetails,
  fetchComparable,
  searchComparableReq,
} from "@/services/AdjusterMyClaimServices/LineItemDetailService";
import { RootState } from "@/store/store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  isLoading: true,
  isFetching: false,
  lineItem: {},
  subCategory: [],
  category: [],
  condition: [],
  room: [],
  retailer: [],
  paymentTypes: [],
  webSearch: {
    isSearching: false,
    insuredPrice: 0,
    priceFrom: 0,
    priceTo: 0,
    pageNo: 1,
    searchKey: "",
    searchList: [],
    noFurtherData: false,
    selectedEngine: WEB_SEARCH_ENGINES.filter((engine) => engine.default)[0],
  },
};

export const fetchRetailersDetails = createAsyncThunk(
  "lineItem/retailer",
  async (_, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getLineItemRetailers();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchRoom = createAsyncThunk("lineItem/room", async (claim: string, api) => {
  const rejectWithValue = api.rejectWithValue;
  try {
    const res = await getLineItemRoom(claim);
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchCondition = createAsyncThunk("lineItem/condition", async (_, api) => {
  const rejectWithValue = api.rejectWithValue;
  try {
    const res = await getLineItemCondition();
    return res;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const fetchLineItemCatergory = createAsyncThunk(
  "lineItem/category",
  async (_, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getLineItemCategory();
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchSubCategory = createAsyncThunk(
  "lineItem/subCategory",
  async (categoryId: number, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await getLineItemSubCategory({ categoryId });
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
        const pincode = res.data.policyHolderPinCode;
        if (!state.lineItemDetail?.webSearch?.isSearching)
          dispatch(searchComparable({ insuredPrice, searchKey, pincode, isInit: true }));
        if (res?.data?.category?.id) {
          dispatch(fetchSubCategory(res?.data?.category?.id));
        }
        if (res?.data?.claimNumber) {
          dispatch(fetchRoom(res?.data?.claimNumber));
        }
      }
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const getPriceRange = (insuredPrice: number) => {
  const range = +insuredPrice * 0.2;
  const priceFrom = +insuredPrice - range;
  const priceTo = +insuredPrice + range;
  return { priceFrom, priceTo };
};

export const searchComparable = createAsyncThunk(
  "comparable/search",
  async (
    payload: {
      insuredPrice?: number;
      searchKey?: string;
      pincode?: number;
      startPrice?: number;
      endPrice?: number;
      isInit?: boolean;
      selectedEngine?: typeof WEB_SEARCH_ENGINES;
    },
    api
  ) => {
    const rejectWithValue = api.rejectWithValue;
    const state = api.getState() as RootState;
    const dispatch = api.dispatch;
    try {
      let { startPrice: priceFrom, endPrice: priceTo } = payload;
      const selectedEngine =
        payload.selectedEngine ?? state.lineItemDetail.webSearch?.selectedEngine;
      const { isInit = false } = payload;
      const pageNo = 1; // initially pageno is 1
      if (isInit) {
        if (!priceFrom && !priceTo) {
          const calculatedPrice = getPriceRange(payload.insuredPrice ?? 0);
          priceFrom = +calculatedPrice.priceFrom.toFixed(2);
          priceTo = +calculatedPrice.priceTo.toFixed(2);
        }
      }
      dispatch(
        updateWebsearch({
          ...payload,
          priceFrom,
          priceTo,
          pageNo,
          isSearching: true,
          searchList: [],
          selectedEngine,
        })
      );
      const api_payload: searchComparableReq = {
        item: payload.searchKey ?? state.lineItemDetail?.webSearch?.searchKey,
        id: selectedEngine.id,
        numberOfCounts: 10,
        priceFrom: priceFrom ?? 0,
        pincode: payload.pincode ?? state.lineItemDetail?.webSearch?.pincode,
        pageNo: pageNo ?? state.lineItemDetail?.webSearch?.pageNo,
        serfWowSearch: true,
        ids: [1],
      };
      if (priceTo) {
        api_payload.priceTo = priceTo ?? 0;
      }
      const res = await fetchComparable(api_payload, true);
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
      // const {
      //   insuredPrice,
      //   searchKey,
      //   selectedEngine,
      //   priceFrom = 0,
      //   priceTo = 0,
      //   pageNo = 1,
      // } = payload;
      // if (selectedEngine) {
      //   state.webSearch.selectedEngine = selectedEngine;
      // }

      state.webSearch = {
        ...state.webSearch,
        ...payload,
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
    builder.addCase(fetchSubCategory.pending, (state) => {
      state.subCategory = [];
    });
    builder.addCase(fetchSubCategory.fulfilled, (state, action) => {
      state.subCategory = action.payload;
    });
    builder.addCase(fetchSubCategory.rejected, (state) => {
      state.subCategory = [];
    });
    builder.addCase(fetchLineItemCatergory.pending, (state) => {
      state.category = [];
    });
    builder.addCase(fetchLineItemCatergory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
    builder.addCase(fetchLineItemCatergory.rejected, (state) => {
      state.category = [];
    });
    builder.addCase(fetchCondition.pending, (state) => {
      state.condition = [];
    });
    builder.addCase(fetchCondition.fulfilled, (state, action) => {
      state.condition = action.payload;
    });
    builder.addCase(fetchCondition.rejected, (state) => {
      state.condition = [];
    });
    builder.addCase(fetchRoom.pending, (state) => {
      state.room = [];
    });
    builder.addCase(fetchRoom.fulfilled, (state, action) => {
      state.room = action.payload;
    });
    builder.addCase(fetchRoom.rejected, (state) => {
      state.room = [];
    });

    builder.addCase(fetchRetailersDetails.pending, (state) => {
      state.retailer = [];
      state.paymentTypes = [];
    });
    builder.addCase(fetchRetailersDetails.fulfilled, (state, action) => {
      const { paymentTypes = [], retailers = [] } = action.payload;
      state.retailer = retailers;
      state.paymentTypes = paymentTypes
        ? paymentTypes.map((_type: string) => ({ label: _type, value: _type }))
        : paymentTypes;
    });
    builder.addCase(fetchRetailersDetails.rejected, (state) => {
      state.retailer = [];
      state.paymentTypes = [];
    });
  },
});

export default LineItemDetailSlice;
export const { resetLineItemDetail, updateWebsearch } = LineItemDetailSlice.actions;
