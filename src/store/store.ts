import { configureStore } from '@reduxjs/toolkit';
import wishlistReducer from './wishlistSlice';
import adminWishlistReducer from './adminWishlistSlice';

export const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    adminWishlist: adminWishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
