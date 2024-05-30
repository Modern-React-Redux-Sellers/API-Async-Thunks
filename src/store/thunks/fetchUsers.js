import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//function argument is whats seen in the thunks action
const fetchUsers = createAsyncThunk('users/fetch', async () => {
    const response = await axios.get('http://localhost:3005/users');

    //Development use only
    await pause(3000);

    return response.data;
});

//Development only
const pause = (duration) => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration)
    })
};


export {fetchUsers};