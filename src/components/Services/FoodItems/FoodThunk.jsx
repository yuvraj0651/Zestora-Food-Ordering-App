import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const StoredFood = localStorage.getItem("food")
    ? JSON.parse(localStorage.getItem("food"))
    : null;

export const initialState = {
    foodItems: StoredFood?.food || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Food Items
export const fetchFoodItems = createAsyncThunk(
    "food/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/foodItems");
            if (!response.ok) {
                throw new Error("something went wrong while fetching food data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Food Item
export const AddFoodItem = createAsyncThunk(
    "food/addFoodItem",
    async (newData, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/foodItems", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding new food items");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Food Item
export const DeleteFoodItem = createAsyncThunk(
    "food/deleteFoodItem",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/foodItems/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting food item");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Food Item
export const UpdateFoodItem = createAsyncThunk(
    "food/updateFoodItem",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/foodItems/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating food item");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const FoodSlice = createSlice({
    name: "food",
    initialState,
    reducers: {
        clearItems: (state) => {
            state.foodItems = [];
            state.isLoading = false;
            state.addLoading = false;
            state.deleteLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("food");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFoodItems.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchFoodItems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.foodItems = action.payload;
                state.error = null;

                localStorage.setItem("food", JSON.stringify({
                    food: state.foodItems,
                }));
            })
            .addCase(fetchFoodItems.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(AddFoodItem.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddFoodItem.fulfilled, (state, action) => {
                state.addLoading = false;
                state.foodItems.push(action.payload);
                state.error = null;

                localStorage.setItem("food", JSON.stringify({
                    food: state.foodItems,
                }));
            })
            .addCase(AddFoodItem.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(DeleteFoodItem.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteFoodItem.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.foodItems = state.foodItems.filter((item) => item.id !== action.payload);
                state.error = null;

                localStorage.setItem("food", JSON.stringify({
                    food: state.foodItems,
                }));
            })
            .addCase(DeleteFoodItem.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(UpdateFoodItem.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateFoodItem.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.foodItems = state.foodItems.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem("food", JSON.stringify({
                    food: state.foodItems,
                }));
            })
            .addCase(UpdateFoodItem.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export const { clearItems } = FoodSlice.actions;

export default FoodSlice.reducer;