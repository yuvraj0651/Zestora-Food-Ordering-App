import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const StoredCart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : null;

export const initialState = {
    cartItems: StoredCart?.cart || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch All Cart Items
export const fetchCart = createAsyncThunk(
    "cart/fetchCart",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/cart");
            if (!response.ok) {
                throw new Error("something went wrong while fetching cart data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Cart Item
export const AddingCart = createAsyncThunk(
    "cart/addingCart",
    async (newCartItem, { rejectWithValue }) => {
        const cartItemWithDate = {
            ...newCartItem,
            orderedAt: new Date().toISOString(),
        };
        try {
            const response = await fetch("http://localhost:5000/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(cartItemWithDate)
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding cart item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Cart Item
export const DeleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting cart item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Cart Item
export const UpdateCart = createAsyncThunk(
    "cart/updateCart",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/cart/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating cart item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CartSlice = createSlice({
    name: "cartApi",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cartItems = action.payload;
                state.error = null;

                localStorage.setItem("cart", JSON.stringify({
                    cart: state.cartItems,
                }));
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddingCart.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingCart.fulfilled, (state, action) => {
                state.addLoading = false;
                state.cartItems.push(action.payload);
                state.error = null;

                localStorage.setItem("cart", JSON.stringify({
                    cart: state.cartItems,
                }));
            })
            .addCase(AddingCart.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteCart.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteCart.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
                state.error = null;

                localStorage.setItem("cart", JSON.stringify({
                    cart: state.cartItems,
                }));
            })
            .addCase(DeleteCart.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateCart.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateCart.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.cartItems = state.cartItems.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem("cart", JSON.stringify({
                    cart: state.cartItems,
                }));
            })
            .addCase(UpdateCart.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export default CartSlice.reducer;