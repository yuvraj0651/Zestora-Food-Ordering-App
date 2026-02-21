import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    footerData: [],
    isLoading: false,
    error: null,
};

// Fetch Header Data
export const fetchFooterData = createAsyncThunk(
    "footer/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/footer");
            if (!response.ok) {
                throw new Error("something went wrong while fetching footer data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const FooterSlice = createSlice({
    name: "footer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchFooterData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFooterData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.footerData = action.payload;
                state.error = null;
            })
            .addCase(fetchFooterData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default FooterSlice.reducer;