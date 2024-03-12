import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    walletData: {},
    token:"",
    getUserOverView:{}

}

export const todoSlice = createSlice({
    name: "walletDeatils",
    initialState: initialState,
    reducers: {
        addWalletDetails: (state, action) => {
            state.walletData = action.payload
        },
        addOverviewDetails: (state, action) => {
            state.getUserOverView = action.payload
        }
    }
});

// actions per il dispatch
export const { addWalletDetails,addOverviewDetails } = todoSlice.actions;

// reducer
export default todoSlice.reducer;