import { createSlice } from "@reduxjs/toolkit";

const initialFilterState = {
  companies:[], statuses:[]
};

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilterState,
  reducers: {
    addCompanyFilter: (state, action) => {
      state.companies = action.payload;
    },
    addStatusFilter: (state, action) => {
        state.statuses = action.payload;
      },
  },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
