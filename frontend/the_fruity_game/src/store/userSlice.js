
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload;
    },
    logoutUser: (state) => {
      state.userId = null;
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;