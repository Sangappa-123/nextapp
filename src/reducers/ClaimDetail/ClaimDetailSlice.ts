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
  roomType: [],
};

const ClaimDetailSlice = createSlice({
  initialState,
  name: "claimDetail",
  reducers: {
    addCategories(state, action) {
      const { payload } = action;
      state.category = [...payload];
      return state;
    },
    addSubcategories(state, action) {
      const { payload } = action;
      state.subCategory = [...payload];
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
    addParticipants(state, action) {
      const { payload } = action;
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
      state.condition = [...payload];
      return state;
    },
    addRetailer(state, action) {
      const { payload } = action;
      state.retailer = [...payload];
      return state;
    },
    addRoom(state, action) {
      const { payload } = action;
      state.room = [...payload];
      return state;
    },
    addRoomType(state, action) {
      const { payload } = action;
      state.roomType = [...payload];
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
  addRoom,
  addRoomType,
  addParticipants,
} = ClaimDetailSlice.actions;
