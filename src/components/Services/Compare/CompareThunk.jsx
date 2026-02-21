import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedCompare = localStorage.getItem("compare")
    ? JSON.parse(localStorage.getItem("compare"))
    : null;

export const initialState = {
    compareData: storedCompare?.compare || [],
    isLoading: false,
    addLoading: false,
    deleteLoading: false,
    updateLoading: false,
    error: null,
};

// Fetch Compare Data
export const fetchCompare = createAsyncThunk(
    "compare/fetchData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/compare");
            if (!response.ok) {
                throw new Error("something went wrong while fetching compare data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Add Compare Data
export const AddingCompare = createAsyncThunk(
    "compare/addingData",
    async (newData, { rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5000/compare", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while adding compare data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Delete Compare Data
export const DeleteCompare = createAsyncThunk(
    "compare/deleteCompare",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/compare/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("something went wrong while deleting compare data");
            };
            return id;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

// Update Compare Data
export const UpdateCompare = createAsyncThunk(
    "compare/updateCompare",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5000/compare/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while updating compare data");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    }
);

export const CompareSlice = createSlice({
    name: "compare",
    initialState,
    reducers: {
        clearCompare: (state) => {
            state.compareData = [];
            state.addLoading = false;
            state.deleteLoading = false;
            state.isLoading = false;
            state.updateLoading = false;
            state.error = null;

            localStorage.removeItem("compare");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompare.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCompare.fulfilled, (state, action) => {
                state.isLoading = false;
                state.compareData = action.payload;
                state.error = null;

                localStorage.setItem("compare", JSON.stringify({
                    compare: state.compareData,
                }));
            })
            .addCase(fetchCompare.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(AddingCompare.pending, (state) => {
                state.addLoading = true;
                state.error = null;
            })
            .addCase(AddingCompare.fulfilled, (state, action) => {
                state.addLoading = false;
                state.compareData.push(action.payload);
                state.error = null;

                localStorage.setItem("compare", JSON.stringify({
                    compare: state.compareData,
                }));
            })
            .addCase(AddingCompare.rejected, (state, action) => {
                state.addLoading = false;
                state.error = action.payload;
            })
            .addCase(DeleteCompare.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(DeleteCompare.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.compareData = state.compareData.filter((item) => item.id !== action.payload);
                state.error = null;

                localStorage.setItem("compare", JSON.stringify({
                    compare: state.compareData,
                }));
            })
            .addCase(DeleteCompare.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            })
            .addCase(UpdateCompare.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(UpdateCompare.fulfilled, (state, action) => {
                state.updateLoading = false;
                state.compareData = state.compareData.map((item) => item.id === action.payload.id ? action.payload : item);
                state.error = null;

                localStorage.setItem("compare", JSON.stringify({
                    compare: state.compareData,
                }));
            })
            .addCase(UpdateCompare.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
    },
});

export const { clearCompare } = CompareSlice.actions;

export default CompareSlice.reducer;