import { createSlice } from '@reduxjs/toolkit';

//'https://example.com/profile_picture.jpg',

// const initialUserDataState;

const userDataSlice = createSlice({
  name: 'userdata',
  initialState:null,
  reducers: {
    getUserDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    getUserDataSuccess(state, action) {
      state.loading = false;
      state.user = action.payload; // Ensure the payload structure here matches the user object structure
      state.error = null;
    },
    getUserDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload; // Ensure the payload here is a valid error object or message
    },
    // Add other actions as needed
  },
});

export const {
  getUserDataStart,
  getUserDataSuccess,
  getUserDataFailure,
} = userDataSlice.actions;

export default userDataSlice.reducer;
