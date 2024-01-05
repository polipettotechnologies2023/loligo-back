import { createSlice, configureStore } from '@reduxjs/toolkit';

//sessio token
const tokenInitialState = {
  value: '',
};


if (typeof window !== 'undefined') {
  tokenInitialState.value = localStorage.getItem('token') || '';
}


const tokenSlice = createSlice({
  name: 'token',
  initialState: tokenInitialState,
  reducers: {
    setToken: (state, action) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload);
      }
      state.value = action.payload;
    },
  },
});


export const store = configureStore({
  reducer: {
    token: tokenSlice.reducer,
  }
});


export const { setToken } = tokenSlice.actions;


// export const tokenReducer = tokenSlice.reducer;
