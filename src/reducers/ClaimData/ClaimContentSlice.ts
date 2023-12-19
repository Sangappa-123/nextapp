import { claimContentListV2 } from "@/services/ClaimContentListService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimContentListDataFull: [],
  claimContentListData: [],
  claimErrorMsg: "",
  searchKeyword: "",
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
        console.log("claimContentData", claimContentData);
        claimContentData.data.map((item: any) => {
          newArr = {
            description: item.description,
            status: item.status?.status ?? null,
            category: item.category?.name ?? null,
            quantity: item.quantity,
            rcvTotal: item.rcvTotal,
            totalStatedAmount: item.totalStatedAmount,
            vendorName: item.vendorName,
            adjusterDescription: item.adjusterDescription,
            itemTag: item.itemTag ?? null,
            cashPayoutExposure: item.cashPayoutExposure,
            claimId: claimId,
            itemId: item.id,
            itemUID: item.itemUID,
            itemNumber: item.itemNumber,
          };
          claimRes.push(newArr);
        });
        state.claimContentListDataFull = claimRes;
        state.claimContentListData = claimRes;
        state.claimErrorMsg = "";
      } else {
        state.claimErrorMsg = claimContentData.message;
      }
    },
    updateClaimContentListData(state, action) {
      const { payload } = action;
      const { claimContentList } = payload;
      state.claimContentListData = claimContentList;
    },
    clearFilter(state) {
      state.claimContentListData = state.claimContentListDataFull;
    },
    deleteClaimContentListItem(state, action) {
      const { payload } = action;
      const { itemId } = payload;

      const claimContentListDataFull = state.claimContentListDataFull;
      const claimContentListData = state.claimContentListData;

      const newClaimContentListFull = claimContentListDataFull.filter((item: any) => {
        return item.itemId !== itemId;
      });
      const newClaimContentList = claimContentListData.filter((item: any) => {
        return item.itemId !== itemId;
      });

      state.claimContentListDataFull = newClaimContentListFull;
      state.claimContentListData = newClaimContentList;
    },
    addClaimListKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
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

export const {
  addClaimContentListData,
  updateClaimContentListData,
  clearFilter,
  deleteClaimContentListItem,
  addClaimListKeyWord,
} = ClaimContentSlice.actions;
