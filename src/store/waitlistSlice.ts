import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface WaitlistData {
  firstName: string;
  lastName: string;
  jobTitle: string;
  companyName: string;
  email: string;
  phone: string;
  industry: string;
  region: string;
  interest: string;
  message: string;
}

interface WaitlistState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: WaitlistState = {
  loading: false,
  success: false,
  error: null,
};

export const submitWaitlist = createAsyncThunk(
  'waitlist/submit',
  async (data: WaitlistData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'waitlists'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const waitlistSlice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    resetSubmitState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitWaitlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitWaitlist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubmitState } = waitlistSlice.actions;
export default waitlistSlice.reducer;
