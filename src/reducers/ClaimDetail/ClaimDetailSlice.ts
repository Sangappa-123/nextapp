import { unknownObjectType } from "@/constants/customTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  subCategory: [],
  category: [],
  pendingTaskList: [],
  messageList: [],
  participants: [],
  contents: {},
  policyInfo: {},
  companyDetails: {},
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
      state.category = new Set();
      state.category = [...state.category, ...payload];
      return state;
    },
    addSubcategories(state, action) {
      const { payload } = action;
      state.subCategory = new Set();
      state.subCategory = [...state.subCategory, ...payload];
      return state;
    },
    addPendingTasks(state, action) {
      const { payload } = action;
      state.pendingTaskList = new Set();
      state.pendingTaskList = [...state.pendingTaskList, ...payload];
      return state;
    },
    addMessageList(state, action) {
      const { payload } = action;
      state.messageList = new Set();
      state.messageList = [...state.messageList, ...payload];
      return state;
    },
    addParticipants(state, action) {
      const { payload } = action;
      state.participants = new Set();
      state.participants = [...state.participants, ...payload];
      return state;
    },
    addContents(state, action) {
      const { payload } = action;
      state.constants = { ...state.constants, ...payload };
      return state;
    },
    addPolicyInfo(state, action) {
      const { payload } = action;
      state.policyInfo = { ...state.policyInfo, ...payload };
      return state;
    },
    addCompanyDetails(state, action) {
      const { payload } = action;
      state.companyDetails = { ...state.companyDetails, ...payload };
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
  addContents,
  addPolicyInfo,
  addCompanyDetails,
  addMessageList,
  addCondition,
  addRetailer,
  addParticipants,
} = ClaimDetailSlice.actions;
