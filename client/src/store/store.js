import { configureStore } from '@reduxjs/toolkit'
import themeReducer from './theme/themeSlice'
import userDataReducer from './userData/userDataSlice'
import forexReducer from './forexData/forexSlice'

export const store = configureStore({
  reducer: {
    theme:themeReducer,
    userdata: userDataReducer,
    forex: forexReducer,
  },
})