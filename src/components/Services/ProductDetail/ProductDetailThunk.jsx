import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    productDetailData: [],
    isLoading: false,
    error: null,
};

// Fetch ProductDetail Data
export const fetchProductDetailData = createAsyncThunk(
    "productDetail/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/productDetailsPage");
            if (!response.ok) {
                throw new Error("something went wrong while fetching product detail data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const ProductDetailSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetailData.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductDetailData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.productDetailData = action.payload;
                state.error = null;
            })
            .addCase(fetchProductDetailData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default ProductDetailSlice.reducer;