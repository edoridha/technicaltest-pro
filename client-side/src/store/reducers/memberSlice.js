import { createSlice } from "@reduxjs/toolkit";
import { fetchMembers, fetchProfile } from "../actions";

const memberSlice = createSlice({
    name: 'memberList',
    initialState: {
        list: [],
        loading: true,
        error: null,
        profile: null
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMembers.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchMembers.fulfilled, (state, action) => {
                state.list = action.payload.response
                state.loading = false
            })
            .addCase(fetchMembers.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
            .addCase(fetchProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.profile = action.payload.response
                state.loading = false
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const { setError, setLoading } = memberSlice.actions
export default memberSlice.reducer