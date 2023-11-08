import { createSlice } from "@reduxjs/toolkit";

const SessionSlice = createSlice({
  initialState: { isLoading: true },
  name: "session",
  reducers: {
    updateLoadingState(state, action) {
      const { payload } = action;
      // state.isLoading = payload;
      state = { ...state, payload };
      return state;
    },
    addSessionData(state, action) {
      // update the state can be done using the "action.payload"
      const { payload } = action;
      state = payload;
      return state;
    },
  },
});
export default SessionSlice;

export const { updateLoadingState, addSessionData } = SessionSlice.actions;
