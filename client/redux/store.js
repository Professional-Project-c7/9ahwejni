import { configureStore , getDefaultMiddleware } from '@reduxjs/toolkit';
import productReducer from './products/productSlice';
// import {createSerializableStateInvariantMiddleware,createImmutableStateInvariantMiddleware,} from '@reduxjs/toolkit';

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   warnAfter: 64, // Adjust the threshold value
// });

// const immutableMiddleware = createImmutableStateInvariantMiddleware({
//   warnAfter: 64, // Adjust the threshold value
// });

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the middleware
      immutableCheck: false,
    }),
//   .concat(serializableMiddleware)
//   .concat(immutableMiddleware),

});
