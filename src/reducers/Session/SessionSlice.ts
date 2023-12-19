import type { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

type initialStateType = {
  [key: string]: any;
};
const initialState: initialStateType = {
  lang: "",
  name: "",
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

export const nameSelector = (state: RootState) => state?.session?.name;

export const insuranceSelector = (state: RootState) =>
  state?.session?.insuranceCompanyName;
