import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    aboutData: [],
    isLoading: false,
    error: null,
};

// Fetch About Data
export const fetchAboutData = createAsyncThunk(
    "about/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/aboutPage");
            if (!response.ok) {
                throw new Error("something went wrong while fetching about data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const AboutSlice = createSlice({
    name: "about",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchAboutData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.aboutData = action.payload;
                state.error = null;
            })
            .addCase(fetchAboutData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default AboutSlice.reducer;