import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the middleware
      immutableCheck: false,
    }),
  // .concat(serializableMiddleware)
  // .concat(immutableMiddleware),

});
