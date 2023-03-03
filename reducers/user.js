import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { firstName: null, token: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateFirstName: (state, action) => {
      state.value.firstName = action.payload;
    },
    updateToken: (state, action) => {
      state.value.token = action.payload;
    },
  },
});

export const { updateFirstName, updateToken } = userSlice.actions;
export default userSlice.reducer;
