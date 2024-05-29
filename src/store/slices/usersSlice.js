import {createSlice} from "@reduxjs/toolkit";
import {fetchUsers} from "../thunks/fetchUsers";

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [],
        isLoading: false,
        error:null
    },
    extraReducers(builder){
        //watches for different cases from async thunk
        builder.addCase(fetchUsers.pending, (state, action) => {
            //set isLoading = true & show loading message
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            //set isLoading = false & show data once fetched
            state.isLoading = false;
            //action.payload is data returned from fetchUsers function
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            //show error message
            state.isLoading = false;
            state.error = action.error;
        });
    }
})

export const usersReducer = usersSlice.reducer;