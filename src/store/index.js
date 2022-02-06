import { configureStore } from "@reduxjs/toolkit";

import memberReducer from "./member";
import filterReducer from "./filter";


const store = configureStore({
  reducer: { member: memberReducer, filter: filterReducer
 },
});

export default store;
