import { unknownObjectType } from "@/constants/customTypes";
import { fetchClaimItemDetails } from "@/services/AdjusterMyClaimServices/LineItemDetailService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  isLoading: true,
  isFetching: false,
  lineItem: {},
};

export const fetchLineItemDetail = createAsyncThunk(
  "lineItem/fetchLineItem",
  async ({ itemId }: { itemId: number }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await fetchClaimItemDetails({ itemId }, true);
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
  },
});

export default LineItemDetailSlice;
export const { resetLineItemDetail } = LineItemDetailSlice.actions;
