import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    wishlistItems: [],
};

export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.wishlistItems.find((item) => item.id === action.payload);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.wishlistItems.push({...action.payload , quantity : 1});
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addToWishlist, removeFromWishlist } = WishlistSlice.actions;

export default WishlistSlice.reducer;