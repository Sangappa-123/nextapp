import { claimContentListV2 } from "@/services/ClaimContentListService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimContentListData: [],
  claimErrorMsg: "",
};
export const fetchClaimContentAction = createAsyncThunk(
  "claimContent/fetchData",
  async (payload: { claimId: string }, api) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      const res = await claimContentListV2(payload);
      return res;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const ClaimContentSlice = createSlice({
  initialState,
  name: "claimContentdata",
  reducers: {
    addClaimContentListData(state, action) {
      const { payload } = action;
      const { claimContentData, claimId } = payload;

      let newArr = {};
      const claimRes: any = [];
      if (claimContentData.data) {
        claimContentData.data.map((item: any) => {
          newArr = {
            description: item.description,
            status: item.status,
            category: item.category,
            quantity: item.quantity,
            rcvTotal: item.rcvTotal,
            totalStatedAmount: item.totalStatedAmount,
            vendorName: item.vendorName,
            adjusterDescription: item.adjusterDescription,
            itemTag: item.itemTag,
            cashPayoutExposure: item.cashPayoutExposure,
            claimId: claimId,
            itemId: item.id,
          };
          claimRes.push(newArr);
        });
        state.claimContentListData = claimRes;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimContentData.message;
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchClaimContentAction.pending, (state) => {
      state.claimContentListData = [];
    });
    builder.addCase(fetchClaimContentAction.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload?.status === 200) {
        state.claimContentListData = payload?.data;
      }
    });
  },
});
export default ClaimContentSlice;

export const { addClaimContentListData } = ClaimContentSlice.actions;
