import { unknownObjectType } from "@/constants/customTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  subCategory: [],
  category: [],
  pendingTaskList: [],
  messageList: [],
  condition: [],
  retailer: [],
  room: [],
};

const ClaimDetailSlice = createSlice({
  initialState,
  name: "claimDetail",
  reducers: {
    addCategories(state, action) {
      const { payload } = action;
      state.category = [...state.category, ...payload];
      return state;
    },
    addSubcategories(state, action) {
      const { payload } = action;
      state.subCategory = [...state.subCategory, ...payload];
      return state;
    },
    addPendingTasks(state, action) {
      const { payload } = action;
      state.pendingTaskList = [...state.pendingTaskList, ...payload];
      return state;
    },
    addMessageList(state, action) {
      const { payload } = action;
      state.messageList = [...state.messageList, ...payload];
      return state;
    },
    addCondition(state, action) {
      const { payload } = action;
      state.condition = { ...state.condition, ...payload };
      return state;
    },
    addRetailer(state, action) {
      const { payload } = action;
      state.retailer = { ...state.retailer, ...payload };
      return state;
    },
  },
});
export default ClaimDetailSlice;

export const {
  addCategories,
  addSubcategories,
  addPendingTasks,
  addMessageList,
  addCondition,
  addRetailer,
} = ClaimDetailSlice.actions;
