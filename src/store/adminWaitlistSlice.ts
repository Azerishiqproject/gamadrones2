import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

export interface WaitlistData {
  id?: string;
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
  createdAt?: string | null;
}

interface AdminWaitlistState {
  data: WaitlistData[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminWaitlistState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchWaitlists = createAsyncThunk(
  'adminWaitlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'waitlists'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const waitlists: WaitlistData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data() as Omit<WaitlistData, 'id' | 'createdAt'> & {
          createdAt?: Timestamp;
        };
        waitlists.push({
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt ? docData.createdAt.toDate().toISOString() : null,
        });
      });
      
      return waitlists;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(message);
    }
  }
);

const adminWaitlistSlice = createSlice({
  name: 'adminWaitlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWaitlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaitlists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWaitlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminWaitlistSlice.reducer;
