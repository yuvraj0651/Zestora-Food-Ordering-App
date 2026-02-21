import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    homeData: [],
    isLoading: false,
    error: null,
};

// Fetch Home Data
export const fetchHomeData = createAsyncThunk(
    "home/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/homepage");
            if (!response.ok) {
                throw new Error("something went wrong while fetching home data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const HomeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchHomeData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchHomeData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.homeData = action.payload;
                state.error = null;
            })
            .addCase(fetchHomeData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default HomeSlice.reducer;