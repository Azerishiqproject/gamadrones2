import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export interface WishlistData {
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

interface WishlistState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  loading: false,
  success: false,
  error: null,
};

export const submitWishlist = createAsyncThunk(
  'wishlist/submit',
  async (data: WishlistData, { rejectWithValue }) => {
    try {
      const docRef = await addDoc(collection(db, 'wishlists'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const wishlistSlice = createSlice({
  name: 'wishlist',
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
      .addCase(submitWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitWishlist.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(submitWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetSubmitState } = wishlistSlice.actions;
export default wishlistSlice.reducer;
