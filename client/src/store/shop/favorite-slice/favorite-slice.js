import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (userId) => {
    const res = await axios.get(`/api/shop/favorites/${userId}`);
    return res.data.data;
  }
);

export const addFavorite = createAsyncThunk(
  "favorites/addFavorite",
  async ({ userId, productId }) => {
    const res = await axios.post("/api/shop/favorites/add", { userId, productId });
    return res.data.data;
  }
);

export const removeFavorite = createAsyncThunk(
  "favorites/removeFavorite",
  async ({ userId, productId }) => {
    await axios.post("/api/shop/favorites/remove", { userId, productId });
    return productId;
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((fav) => fav.productId);
      })
      .addCase(addFavorite.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      });
  },
});

export default favoriteSlice.reducer;