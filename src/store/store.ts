import { configureStore } from '@reduxjs/toolkit';
import waitlistReducer from './waitlistSlice';
import adminWaitlistReducer from './adminWaitlistSlice';

export const store = configureStore({
  reducer: {
    waitlist: waitlistReducer,
    adminWaitlist: adminWaitlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
