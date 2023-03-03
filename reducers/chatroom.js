import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { chatroomId: null },
};

export const chatroomIdSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    updateChatroomId: (state, action) => {
      state.value.chatroomId = action.payload;
    },
   
  },
});

export const { updateChatroomId } = chatroomIdSlice.actions;
export default chatroomIdSlice.reducer;
