import { configureStore, createSelector  } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import RouterStateReducer from './RouterSlice';

const rootReducer = combineReducers({
  routerState: RouterStateReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
