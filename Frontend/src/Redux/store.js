import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./snackBarSlice"
import userReducer from "./userSlice";
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {persistStore, persistReducer} from 'redux-persist';
import {combineReducers} from 'redux';
import { useReducer } from "react";

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  snackBar: snackBarReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
