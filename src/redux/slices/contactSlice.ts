/* eslint-disable import/no-unused-modules */
import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    list: [],
  },
  reducers: {
    addContact: (data, action) => {
      // eslint-disable-next-line no-var
      console.log(action.payload);
      data.list = action.payload;
    },
    removeContact: (data, action) => {
      data.list = action.payload;
    },
    updateContact: (data, action) => {
      data.list = action.payload;
    },
  },
});

export const { addContact, removeContact, updateContact } = contactSlice.actions;

export default contactSlice.reducer;
