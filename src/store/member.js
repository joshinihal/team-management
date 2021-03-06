import { createSlice } from "@reduxjs/toolkit";

const initialMemberState = {
  items: [
  ],
};

const memberSlice = createSlice({
  name: "member",
  initialState: initialMemberState,
  reducers: {
    addMember: (state, action) => {
      state.items.push(action.payload);
    },
    deleteMember: (state, action) => {
      state.items = state.items.filter(
        (each) => each.name !== action.payload.name
      );
    },
  },
});

export const memberActions = memberSlice.actions;
export default memberSlice.reducer;
