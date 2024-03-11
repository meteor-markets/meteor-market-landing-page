import axios from "axios";
import Apiconfigs from "./ApiConfig";

export const connectWallet = async (useraddress) => {
    
  try {
    let response = await axios.post(Apiconfigs?.connectwallet, 
      {
        walletAddress: useraddress,
      },
      {
      headers: {
        "Content-Type": `application/json`,
      },
    });
    return response?.data?.result;
  } catch (error) {
    return error?.response?.data
  }
};

export const getProfileHandler = async (token) => {
    
  try {
    const response = await axios.get(Apiconfigs.profile, {
      headers: {
        token,
      },
    });
    return response?.data?.result;
  } catch (error) {
    return error?.response?.data
  }
};
export const FetchCoinList = async (data, dispatch) => {
    
    try {
      let response = await axios.get(Apiconfigs?.coinlist,
        
        {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      return response?.data?.result;
    } catch (error) {
      return error?.response?.data
    }
  };
  export const supplyCoins = async (body, dispatch) => {
    
    try {
      let response = await axios.post(Apiconfigs?.supplyCoin, body,{
        headers: {
          "Content-Type": `application/json`,
        },
      });
      return response?.data?.result;
    } catch (error) {
      return error?.response?.data
    }
  };
  export const FetchUserPortfolio = async (data, dispatch) => {
    let userAdress = sessionStorage.getItem("userAddress");
    let tokenAddrss = sessionStorage.getItem("token")
   
  if (tokenAddrss) {
    try {
      let response = await axios.get(`${Apiconfigs?.getuserprotfolio}?walletAddress=${userAdress}`, {
        headers: {
          "Content-Type": `application/json`,
          token: tokenAddrss,
        },
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data
    }
  }
  
  
  };
  export const FetchOverview = async (data, dispatch) => {
    let tokenAddrss = sessionStorage.getItem("token")
   if (tokenAddrss) {
    try {
      let response = await axios.get(Apiconfigs?.overview, {
        headers: {
          "Content-Type": `application/json`,
          token: tokenAddrss,
        },
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data
    }
   }
   
  };