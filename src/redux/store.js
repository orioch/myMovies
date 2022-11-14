import { configureStore } from "@reduxjs/toolkit";
import listsReducer from "./features/listSlice";

export const store = configureStore({
  reducer: {
    lists: listsReducer,
  },
});
