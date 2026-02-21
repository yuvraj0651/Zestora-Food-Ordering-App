import { createSlice } from "@reduxjs/toolkit";

const localInitialState = {
    cartItems: [],
};

export const CartSlice = createSlice({
    name: "cartLocal",
    initialState: localInitialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity = existingItem.quantity + 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },
        increaseCartQuantity: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseCartQuantity: (state, action) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);

            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const { addToCart,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    clearCart
} = CartSlice.actions;

export default CartSlice.reducer;