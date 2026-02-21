import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    headerData: [],
    isLoading: false,
    error: null,
};

// Fetch Header Data
export const fetchHeaderData = createAsyncThunk(
    "header/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/header");
            if (!response.ok) {
                throw new Error("something went wrong while fetching header data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const HeaderSlice = createSlice({
    name: "header",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeaderData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHeaderData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.headerData = action.payload;
                state.error = null;
            })
            .addCase(fetchHeaderData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default HeaderSlice.reducer;