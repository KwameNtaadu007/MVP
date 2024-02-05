import { createSlice } from '@reduxjs/toolkit';

const lightStyles = ['light','bg-slate-50', 'text-slate-900'];
const darkStyles = ['dark', 'text-white', 'bg-slate-800'];

const applyStyles = (styles) => {
  const { classList } = document.documentElement;
  classList.remove(...darkStyles);
  classList.remove(...lightStyles);
  classList.add(...styles);
};

const initialState = {
  color: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    lightMode: (state) => {
      applyStyles(lightStyles);
      state.color = 'light';
    },
    darkMode: (state) => {
      applyStyles(darkStyles);
      state.color = 'dark';
    },
  },
});

export const { lightMode, darkMode } = themeSlice.actions;

export default themeSlice.reducer;
