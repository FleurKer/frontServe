import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { monService: null },
};

export const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    updateServiceName: (state, action) => {
      state.value.monService = action.payload;
    },
   
  },
});

export const { updateServiceName } = serviceSlice.actions;
export default serviceSlice.reducer;
