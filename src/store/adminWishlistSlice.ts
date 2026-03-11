import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface WishlistData {
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
  createdAt?: any;
}

interface AdminWishlistState {
  data: WishlistData[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminWishlistState = {
  data: [],
  loading: false,
  error: null,
};

export const fetchWishlists = createAsyncThunk(
  'adminWishlist/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const q = query(collection(db, 'wishlists'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const wishlists: WishlistData[] = [];
      querySnapshot.forEach((doc) => {
        const docData = doc.data();
        wishlists.push({
          id: doc.id,
          ...docData,
          createdAt: docData.createdAt ? docData.createdAt.toDate().toISOString() : null
        } as WishlistData);
      });
      
      return wishlists;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const adminWishlistSlice = createSlice({
  name: 'adminWishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchWishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default adminWishlistSlice.reducer;
