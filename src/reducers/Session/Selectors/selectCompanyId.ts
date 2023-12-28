import selectRootState from "@/reducers/selectRootState";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@/store/store";

const selectCompanyId = createSelector([selectRootState], (rootState: RootState) => {
  return rootState?.session?.companyId;
});

export default selectCompanyId;
