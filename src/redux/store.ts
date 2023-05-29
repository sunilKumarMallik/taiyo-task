import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import countryReducer from './slices/countrySlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import contactReducer from './slices/contactSlice';
// eslint-disable-next-line import/no-unused-modules
const userProfilePersistConfig = {
  key: 'userProfile',
  storage: storage,
};
export default configureStore({
  reducer: {
    counter: counterReducer,
    country: countryReducer,
    contact: persistReducer(userProfilePersistConfig, contactReducer),
  },
});
