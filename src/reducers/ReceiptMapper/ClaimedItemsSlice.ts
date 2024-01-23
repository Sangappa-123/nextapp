import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  claimedItemsList: [],
  claimedItemsErrorMsg: "",
  searchKeyword: "",
};

const ClaimedItemsSlice = createSlice({
  initialState,
  name: "claimedItems",
  reducers: {
    addClaimedItemsListData(state, action) {
      const { payload } = action;

      const { claimedData } = payload;
      let newArr = {};
      const claimRes: any = [];
      if (claimedData.data) {
        claimedData.data.itemReplacement.map((item: any) => {
          const subRowRes: any = [];

          if (item.claimItem.replaceItems) {
            let subRow = {};
            let recieptValueSum = 0;
            let quantitySum = 0;
            let maxReplacmentSum = 0;
            let cashPaidSum = 0;
            let handoverDueSum = 0;
            let handoverPaidSum = 0;
            item.claimItem.replaceItems.map((subItem: any) => {
              recieptValueSum += parseFloat(subItem.receiptValue || 0);
              quantitySum += parseFloat(subItem.quantity || 0);
              maxReplacmentSum += parseFloat(subItem.replacementExposure || 0);
              cashPaidSum += parseFloat(subItem.cashPaid || 0);
              handoverDueSum += parseFloat(subItem.holdOverDue || 0);
              handoverPaidSum += parseFloat(subItem.holdOverPaid || 0);
              subRow = {
                ...subItem,
                holdOverPaymentPaidAmount: subItem.holdOverPaid,
                subRow: true,
              };
              subRowRes.push(subRow);
            });
            const subTotalRow = {
              receiptValue: recieptValueSum,
              quantity: quantitySum,
              replacementExposure: maxReplacmentSum,
              cashPaid: cashPaidSum,
              holdOverDue: handoverDueSum,
              holdOverPaymentPaidAmount: handoverPaidSum,
              totalRow: true,
            };
            subRowRes.push(subTotalRow);
          }
          newArr = {
            ...item.claimItem,
            statusFilter: item.claimItem.status?.status,
            categoryFilter: item.claimItem.category?.categoryName,
            selected: false,
            subRows: subRowRes,
          };

          claimRes.push(newArr);
        });

        state.claimedItemsList = claimRes;
        state.claimedItemsErrorMsg = "";
      } else {
        state.claimedItemsErrorMsg = claimedData.message;
      }
    },
    addClaimedItemsKeyWord(state, action) {
      const { payload } = action;
      const { searchKeyword } = payload;

      state.searchKeyword = searchKeyword;
    },
    updateClaimedItemsListData(state, action) {
      const { payload } = action;
      const { claimedData } = payload;
      state.claimedItemsList = claimedData;
    },
  },
});
export default ClaimedItemsSlice;

export const {
  addClaimedItemsListData,
  addClaimedItemsKeyWord,
  updateClaimedItemsListData,
} = ClaimedItemsSlice.actions;
