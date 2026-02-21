import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const storedWishlist = localStorage.getItem("wishlist")
//     ? JSON.parse(localStorage.getItem("wishlist"))
//     : null;

export const initialState = {
    wishlistData: [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Wishlist Data
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/wishlist");
            if (!response.ok) {
                throw new Error("something went wrong while fetching wishlist data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Wishlist Data
export const AddingWishlist = createAsyncThunk(
    "wishlist/addingData",
    async (newData, { rejectWithValue }) => {
        const DataWithQty = {
            ...newData,
            quantity: 1,
        }
        try {
            const response = await fetch("http://localhost:5000/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(DataWithQty),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding wishlist data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Wishlist Data
export const DeleteWishlist = createAsyncThunk(
    "wishlist/deleteWishlist",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting wishlist data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Wishlist Data
export const UpdateWishlist = createAsyncThunk(
    "wishlist/updateWishlist",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/wishlist/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating wishlist data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        clearWishlist: (state) => {
            state.wishlistData = [];
            state.addLoading = false;
            state.deleteLoading = false;
            state.isLoading = false;
            state.updateLoading = false;
            state.error = null;

            // localStorage.removeItem("wishlist");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.isLoading = false;
                state.wishlistData = action.payload;
                state.error = null;

                // localStorage.setItem("wishlist", JSON.stringify({
                //     wishlist: state.wishlistData,
                // }));
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddingWishlist.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingWishlist.fulfilled, (state, action) => {
                state.addLoading = false;
                state.error = null;

                const existingItem = state.wishlistData.find((item) => item.id === action.payload.id);
                if (!existingItem) {
                    state.wishlistData.push(action.payload);
                }

                // localStorage.setItem("wishlist", JSON.stringify({
                //     wishlist: state.wishlistData,
                // }));
            })
            .addCase(AddingWishlist.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(DeleteWishlist.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteWishlist.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.wishlistData = state.wishlistData.filter((item) => item.id !== action.payload);
                state.error = null;

                // localStorage.setItem("wishlist", JSON.stringify({
                //     wishlist: state.wishlistData,
                // }));
            })
            .addCase(DeleteWishlist.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(UpdateWishlist.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateWishlist.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.wishlistData = state.wishlistData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                // localStorage.setItem("wishlist", JSON.stringify({
                //     wishlist: state.wishlistData,
                // }));
            })
            .addCase(UpdateWishlist.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export const { clearWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;