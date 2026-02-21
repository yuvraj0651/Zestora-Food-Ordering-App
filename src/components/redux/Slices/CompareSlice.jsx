import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    compareItems: [],
};

export const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        addToCompare: (state, action) => {
            const existingItem = state.compareItems.find((item) => item.id === action.payload);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.compareItems.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCompare: (state, action) => {
            state.compareItems = state.compareItems.filter((item) => item.id !== action.payload.id);
        },
    },
});

export const { addToCompare, removeFromCompare } = CompareSlice.actions;

export default CompareSlice.reducer;