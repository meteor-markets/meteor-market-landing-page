import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    walletData: {},
    token:"",
    currentbalance:"",
    web3:null,

    getUserOverView:{},
    userDetails:{},
    getLendingPageCoinDetails:[],
    allBalance:{},



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
        },
        findUserDetails: (state, action) => {
            state.userDetails = action.payload
        },
        addLendingPageCoinDetails: (state, action) => {
            state.getLendingPageCoinDetails = action.payload
        },
        addAllBalance: (state, action) => {
            state.allBalance = action.payload
        }
    }
});

// actions per il dispatch
export const { addWalletDetails,addOverviewDetails,addBalllance ,addAllBalance,addWeb3,findUserDetails,addLendingPageCoinDetails} = todoSlice.actions;

// reducer
export default todoSlice.reducer;