import { configureStore, autoBatchEnhancer } from "@reduxjs/toolkit";

import { IS_PRODUCTION } from "constants/env";

import { templateReducer } from "./slices";
import { listenerMiddleware } from "./middleware";

const store = configureStore({
  reducer: { template: templateReducer },
  devTools: !IS_PRODUCTION,
  enhancers: existingEnhancers => existingEnhancers.concat(autoBatchEnhancer()),
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;
