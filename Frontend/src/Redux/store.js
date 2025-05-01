import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./snackBarSlice"
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  snackBar: snackBarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
