import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  urgentClaimListData: [],
  currentPageNumber: 1,
  totalClaims: 0,
  searchKeyword: "",
  statusIds: null,
  claimErrorMsg: "",
};

const UrgentClaimSlice = createSlice({
  initialState,
  name: "urgentclaimdata",
  reducers: {
    addUrgentClaimListData(state, action) {
      const { payload } = action;
      const { data, message } = payload;
      if (!data) {
        state.urgentClaimListData = [];
        state.claimErrorMsg = message;
      } else {
        state.urgentClaimListData = data.claims;
        state.totalClaims = data.totalClaims;
        state.claimErrorMsg = "";
      }
      return state;
    },
    // addUrgentClaimListData(state, action) {
    //   const { payload } = action;
    //   const { urgentClaimData } = payload;

    //   let newArr = {};
    //   const urgentClaimRes = [];
    //   if (urgentClaimData.data) {
    //     urgentClaimData.data.claims.map((item) => {
    //       newArr = {
    //         claimNumber: item.claimNumber,
    //         status: item.status.status,
    //         contractedEndTime: item.contractedEndTime,
    //         noOfItems: item.noOfItems,
    //         policyHoldersName:
    //           item.insuredDetails.lastName + ", " + item.insuredDetails.firstName,
    //         claimDate: item.createDate,
    //         elapsedId: item.elapsedId,
    //         lastNote: item.lastUpdateDate,
    //         statusNumber: item.status.id,
    //       };
    //       urgentClaimRes.push(newArr);
    //     });
    //     state.urgentClaimListData = urgentClaimRes;
    //     state.currentPageNumber = urgentClaimData.data.currentPageNumber;
    //     state.totalClaims = urgentClaimData.data.totalClaims;
    //     state.claimErrorMsg = "";
    //   } else {
    //     state.claimErrorMsg = urgentClaimData.message;
    //   }
    // },
    addSearchKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
    //   addFilterValues(state, action) {
    //     const { payload } = action;
    //     const { statusIds } = payload;

    //     state.statusIds = statusIds;
    //   },
  },
});
export default UrgentClaimSlice;

export const { addUrgentClaimListData, addSearchKeyWord } = UrgentClaimSlice.actions;
