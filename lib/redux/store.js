import { configureStore } from "@reduxjs/toolkit";
import { logApi } from "@/lib/redux/api/logApi";
import { traceApi } from "@/lib/redux/api/traceApi";
import { eventApi } from "@/lib/redux/api/eventApi";

export const reduxStore = configureStore({
  reducer: {
    [logApi.reducerPath]: logApi.reducer,
    [traceApi.reducerPath]: traceApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logApi.middleware)
      .concat(traceApi.middleware)
      .concat(eventApi.middleware),
  devTools: true,
});
