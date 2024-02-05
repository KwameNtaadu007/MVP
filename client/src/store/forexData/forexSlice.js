import { createSlice } from '@reduxjs/toolkit';

// forexSlice using createSlice
const forexSlice = createSlice({
  name: 'forex',
  initialState: {data:null},
  reducers: {
    updateForex: (state, action) => {
    //  console.log(action.payload,'payload')
      state.data = action.payload.convertedValues; 
    },
  }, // additional actions here if needed
});

export const { updateForex } = forexSlice.actions; // Export the action creator

export default forexSlice.reducer;

