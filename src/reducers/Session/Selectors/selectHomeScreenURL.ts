import selectRootState from "@/reducers/selectRootState";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const selectRootStateURL = createSelector([selectRootState], (rootState: RootState) => {
  return rootState?.session?.homeScreen;
});

export default selectRootStateURL;
