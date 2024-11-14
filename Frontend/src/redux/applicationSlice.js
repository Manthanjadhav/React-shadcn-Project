import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [], // This should be defined here as an empty array
  },
  reducers: {
    setApplication: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
