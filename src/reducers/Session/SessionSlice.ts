import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "",
};

const SessionSlice = createSlice({
  initialState,
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
    resetSessionState() {
      return initialState;
    },
  },
});
export default SessionSlice;

export const { updateLoadingState, addSessionData, resetSessionState } =
  SessionSlice.actions;
