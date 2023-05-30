import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './slices/countrySlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import contactReducer from './slices/contactSlice';
// eslint-disable-next-line import/no-unused-modules
const userProfilePersistConfig = {
  key: 'userProfile',
  storage: storage,
};
// configuring the Redux store using the configureStore
export default configureStore({
  reducer: {
    country: countryReducer,
    // sets up the store with multiple reducers and enables data persistence for the contact slice using redux-persist
    contact: persistReducer(userProfilePersistConfig, contactReducer),
  },
});
