import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk("categories/fetchAll", async () => {
  const res = await axios.get("http://localhost:4000/api/admin/categories/get");
  return res.data.data;
});

export const addCategory = createAsyncThunk("categories/add", async (name) => {
  await axios.post("http://localhost:4000/api/admin/categories/add", { name });
});

export const deleteCategory = createAsyncThunk("categories/delete", async (id) => {
  await axios.delete(`http://localhost:4000/api/admin/categories/delete/${id}`);
});

const categorySlice = createSlice({
  name: "adminCategories",
  initialState: { categoryList: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categoryList = action.payload;
    });
  },
});

export default categorySlice.reducer;