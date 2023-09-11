import { createSlice } from '@reduxjs/toolkit';

const filtersInitialState = { filter: '' };

const filtersSlice = createSlice({
  name: 'filter',
  initialState: filtersInitialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;

export const filterReducer = filtersSlice.reducer;
export const getFilter = store => store.filters.filter;