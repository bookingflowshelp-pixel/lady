import { configureStore } from "@reduxjs/toolkit";
import adminSlice  from "./slices/adminSlice";


export const store = configureStore({
    reducer: {
      admin: adminSlice,
    },
  });
  
  export default store;
  