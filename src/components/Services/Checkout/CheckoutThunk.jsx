import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const initialState = {
    checkoutData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Checkout Data
export const fetchCheckout = createAsyncThunk(
    "checkout/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/checkout");
            if (!response.ok) {
                throw new Error("something went wrong while fetching checkout data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Checkout Data
export const AddingCheckout = createAsyncThunk(
    "checkout/addCheckout",
    async (newData, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding checkout data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Checkout Data
export const DeleteCheckout = createAsyncThunk(
    "checkout/deleteCheckout",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/checkout/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting checkout data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Checkout Data
export const UpdateCheckout = createAsyncThunk(
    "checkout/updateCheckout",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/checkout/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating checkout data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CheckoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCheckout.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCheckout.fulfilled, (state, action) => {
                state.isLoading = false;
                state.checkoutData = action.payload;
                state.error = null;
            })
            .addCase(fetchCheckout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddingCheckout.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingCheckout.fulfilled, (state, action) => {
                state.addLoading = false;
                state.checkoutData.push(action.payload);
                state.error = null;
            })
            .addCase(AddingCheckout.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(DeleteCheckout.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteCheckout.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.checkoutData = state.checkoutData.filter((item) => item.id !== action.payload);
                state.error = null;
            })
            .addCase(DeleteCheckout.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(UpdateCheckout.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateCheckout.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.checkoutData = state.checkoutData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;
            })
            .addCase(UpdateCheckout.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export default CheckoutSlice.reducer;