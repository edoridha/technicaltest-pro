import { createSlice } from "@reduxjs/toolkit";
import { fetchMembers, fetchProfile, getMemberById } from "../actions";

const memberSlice = createSlice({
  name: "memberList",
  initialState: {
    list: [],
    loading: true,
    error: null,
    currentPage: 0,
    totalItem: 0,
    startItem: 0,
    endItem: 0,
    profile: null,
    member: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMembers.fulfilled, (state, action) => {
        state.list = action.payload.response;
        state.currentPage = action.payload.pagination.currentPage;
        state.totalItem = action.payload.pagination.totalItem;
        state.startItem = action.payload.pagination.startItem;
        state.endItem = action.payload.pagination.endItem;
        state.loading = false;
      })
      .addCase(fetchMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.profile = action.payload.response;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getMemberById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMemberById.fulfilled, (state, action) => {
        state.member = action.payload.response;
        state.loading = false;
      })
      .addCase(getMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      });
  },
});

export const { setError, setLoading } = memberSlice.actions;
export default memberSlice.reducer;
