import { unknownObjectType } from "@/constants/customTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState: unknownObjectType = {
  subCategory: [],
  category: [],
  pendingTaskList: [],
  messageLsit: [],
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
      state.messageList = [...state.messageLsit, ...payload];
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
  addMessageList,
  addCondition,
  addRetailer,
  addRoom,
  addRoomType,
} = ClaimDetailSlice.actions;
