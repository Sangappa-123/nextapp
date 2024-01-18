import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentContentListSliceDataFull: [],
  assignmentContentListfetching: false,
};

export const fetchAssignmentContentListAction = createAsyncThunk(
  "assignmentContentList/fetchData",
  async (
    param: {
      pageNo: number;
      recordPerPage: number;
      claimNum: string;
      sortBy: string;
      orderBy: string;
      q: string;
    },
    api
  ) => {
    const rejectWithValue = api.rejectWithValue;
    try {
      // service need to implement
      const payload = {
        status: 200,
        data: [],
      };
      return payload;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const AssignmentContentListSlice = createSlice({
  initialState,
  name: "assignmentContentListdata",
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAssignmentContentListAction.pending, (state) => {
      state.assignmentContentListfetching = true;
      state.assignmentContentListSliceDataFull = [];
    });
    builder.addCase(fetchAssignmentContentListAction.fulfilled, (state, action) => {
      const payload = action.payload;
      state.assignmentContentListfetching = false;
      if (payload && payload?.status === 200) {
        state.assignmentContentListSliceDataFull = payload?.data;
      }
    });
    builder.addCase(fetchAssignmentContentListAction.rejected, (state) => {
      state.assignmentContentListfetching = false;
      state.assignmentContentListSliceDataFull =
        initialState.assignmentContentListSliceDataFull;
    });
  },
});
export default AssignmentContentListSlice;
