import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await axios.get("http://localhost:4000/api/admin/users/get");
  return res.data.data;
});
export const addUser = createAsyncThunk("users/add", async (user) => {
  await axios.post("http://localhost:4000/api/admin/users/add", user);
});
export const editUser = createAsyncThunk("users/edit", async ({ id, ...user }) => {
  await axios.put(`http://localhost:4000/api/admin/users/edit/${id}`, user);
});
export const deleteUser = createAsyncThunk("users/delete", async (id) => {
  await axios.delete(`http://localhost:4000/api/admin/users/delete/${id}`);
});

const usersSlice = createSlice({
  name: "adminUsers",
  initialState: { userList: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.userList = action.payload;
    });
  },
});

export default usersSlice.reducer;