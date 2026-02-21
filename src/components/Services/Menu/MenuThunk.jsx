import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    menuData: [],
    isLoading: false,
    error: null,
};

// Fetch Menu Data
export const fetchMenuData = createAsyncThunk(
    "menu/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/menuPage");
            if (!response.ok) {
                throw new Error("something went wrong while fetching menu data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const MenuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchMenuData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.menuData = action.payload;
                state.error = null;
            })
            .addCase(fetchMenuData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default MenuSlice.reducer;