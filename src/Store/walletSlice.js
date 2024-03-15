import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    walletData: {},
    token:"",
    currentbalance:"",
    web3:null,

    getUserOverView:{}

}

export const todoSlice = createSlice({
    name: "walletDeatils",
    initialState: initialState,
    reducers: {
        addWalletDetails: (state, action) => {
            state.walletData = action.payload
        },
        addBalllance: (state, action) => {
            state.currentbalance = action.payload
        },
        addWeb3: (state, action) => {
            state.web3 = action.payload
        },
        addOverviewDetails: (state, action) => {
            state.getUserOverView = action.payload
        }
    }
});

// actions per il dispatch
export const { addWalletDetails,addOverviewDetails,addBalllance ,addWeb3} = todoSlice.actions;

// reducer
export default todoSlice.reducer;