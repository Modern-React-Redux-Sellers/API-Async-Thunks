import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//function argument is whats seen in the thunks action
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    return response.data;
});

export {fetchUsers};