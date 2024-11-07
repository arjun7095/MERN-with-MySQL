import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get('http://localhost:5000/api/users');
    return response.data;
});

// Async thunk to add a new user
export const addUser = createAsyncThunk('users/addUser', async (user) => {
    const response = await axios.post('http://localhost:5000/api/users', user);
    return response.data;
});

// Async thunk to delete a user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    return id;
});

// Slice to handle user actions
const userSlice = createSlice({
    name: 'users',
    initialState: { users: [], status: 'idle', error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.users.push(action.payload);
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.users = state.users.filter((user) => user.id !== action.payload);
            });
    },
});

export default userSlice.reducer;
