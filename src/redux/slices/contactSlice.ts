/* eslint-disable import/no-unused-modules */
import { createSlice } from '@reduxjs/toolkit';

export const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    list: [],
    //in contact slice The initial state of the slice, which includes a list array. where we store the contacts data
  },
  reducers: {
    //ruducer to update the state
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
//dispatch the actions and update the state

export default contactSlice.reducer;
