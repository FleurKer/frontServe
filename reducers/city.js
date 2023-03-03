import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { cityName: null },
};

export const citySlice = createSlice({
  name: 'city',
  initialState,
  reducers: {
    updateCityName: (state, action) => {
      state.value.cityName = action.payload;
    },
   
  },
});

export const { updateCityName } = citySlice.actions;
export default citySlice.reducer;
