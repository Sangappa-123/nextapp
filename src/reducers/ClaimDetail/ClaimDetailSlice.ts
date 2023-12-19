import { unknownObjectType } from "@/constants/customTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  // isLoading: true,
  // isFetching: false,
  // lineItem: {},
  subCategory: [],
  category: [],
  pendingTaskList: [],
  messageLsit: [],
  // room: [],
  // retailer: [],
  // paymentTypes: [],
  // webSearch: {
  //   isSearching: false,
  //   insuredPrice: 0,
  //   priceFrom: 0,
  //   priceTo: 0,
  //   pageNo: 1,
  //   searchKey: "",
  //   searchList: [],
  //   noFurtherData: false,
  //   selectedEngine: WEB_SEARCH_ENGINES.filter((engine) => engine.default)[0],
  // },
};

const ClaimDetailSlice = createSlice({
  initialState,
  name: "claimDetail",
  reducers: {
    addCategories(state, action) {
      const { payload } = action;
      state.category = { ...state.category, ...payload };
      return state;
    },
    addSubcategories(state, action) {
      const { payload } = action;
      state.subCategory = { ...state.subCategory, ...payload };
      return state;
    },
    addPendingTasks(state, action) {
      const { payload } = action;
      state.pendingTaskList = { ...state.pendingTaskList, ...payload };
      return state;
    },
    addMessageList(state, action) {
      const { payload } = action;
      state.messageLsit = { ...state.messageLsit, ...payload };
      return state;
    },
  },
});
export default ClaimDetailSlice;

export const { addCategories, addSubcategories, addPendingTasks, addMessageList } =
  ClaimDetailSlice.actions;
