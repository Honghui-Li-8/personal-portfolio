import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {act} from "react";

//create the initial state, pressed on a node

export type AuthState = {
  route: string;
};

const initialState: AuthState = {
  route: "Home",
};

//create the slice
const routerSlice = createSlice({
  name: "routerState",
  initialState,
  reducers: {
    navigate: (state, action: PayloadAction<{ newRoute:string }>) => {
      state.route = action.payload.newRoute;
    }
  },
});

export const { navigate } =
routerSlice.actions;

export default routerSlice.reducer;
