import { createSlice } from "@reduxjs/toolkit";

const SessionSlice = createSlice({
  initialState: { isLoading: true },
  name: "session",
  reducers: {
    updateLoadingState(state, action) {
      const { payload } = action;
      state = { ...state, ...payload };
      return state;
    },
    addSessionData(state, action) {
      const { payload } = action;
      state = { ...state, ...payload };
      return state;
    },
  },
});
export default SessionSlice;

export const { updateLoadingState, addSessionData } = SessionSlice.actions;
