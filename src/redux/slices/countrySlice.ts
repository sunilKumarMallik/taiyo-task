/* eslint-disable import/no-unused-modules */
import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-unused-modules
export const countySlice = createSlice({
  name: 'country',
  initialState: {
    countries: [],
    world: [],
    date: [],
  },
  reducers: {
    getAllCountries: (state, action) => {
      state.countries = action.payload;
      console.log(state.countries, 'countries Data');
    },
    getWorldWideData: (state, action) => {
      state.world = action.payload;
      console.log(state.countries, 'World Data');
    },
    getDate: (state, action) => {
      state.date = action.payload;
      console.log(state.countries, 'Date Data');
    },
  },
});

export const { getAllCountries, getWorldWideData, getDate } = countySlice.actions;

export default countySlice.reducer;
