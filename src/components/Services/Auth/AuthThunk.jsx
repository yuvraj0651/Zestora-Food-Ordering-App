import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const storedAuth = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : null;

export const initialState = {
    authData: storedAuth?.user || [],
    isAuthenticated: storedAuth?.isAuthenticated || false,
    token: storedAuth?.token || null,
    loginLoading: false,
    registerLoading: false,
    error: null,
};

// Login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const userResponse = await fetch("http://localhost:5000/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((user) => user.email === email && user.password === password);

            if (!existingUser) {
                throw new Error("Invalid Credentials");
            };

            return existingUser;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    },
);

// Register User
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (newUser, { rejectWithValue }) => {

        const newUserData = {
            ...newUser,
            status: "active",
            createdAt: new Date(Date.now()).toDateString(),
        }

        try {
            const userResponse = await fetch("http://localhost:5000/auth");
            if (!userResponse.ok) {
                throw new Error("something went wrong while logging user");
            };
            const users = await userResponse.json();

            const existingUser = users.find((user) => user.email === newUser.email);

            if (existingUser) {
                throw new Error("User Already Exists");
            };

            const response = await fetch("http://localhost:5000/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUserData),
            });
            if (!response.ok) {
                throw new Error("something went wrong while registering new user");
            };
            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong");
        }
    },
);

export const AuthSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.authData = [];
            state.isAuthenticated = false;
            state.error = null;
            state.token = null;
            state.loginLoading = false;
            state.registerLoading = false;

            localStorage.removeItem("auth");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loginLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.loginLoading = false;
                state.authData = action.payload;
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    isAuthenticated: true,
                    token: fakeToken,
                }));
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.registerLoading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                const fakeToken = Math.random().toString(36).slice(2);

                state.registerLoading = false;
                state.authData.push(action.payload);
                state.isAuthenticated = true;
                state.token = fakeToken;
                state.error = null;

                localStorage.setItem("auth", JSON.stringify({
                    user: action.payload,
                    isAuthenticated: true,
                    token: fakeToken,
                }));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.registerLoading = false;
                state.error = action.payload || action.error.message;
            })
    },
});

export const { logout } = AuthSlice.actions;

export default AuthSlice.reducer;