import axios from "axios";
import Apiconfigs from "./ApiConfig";

export const FetchCoinList = async (data, dispatch) => {
    
    try {
      let response = await axios.get(Apiconfigs?.coinlist, {
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
  let AuthToken = sessionStorage.getItem("loginToken").split(" ")[1];
    
    try {
      let response = await axios.get(`${Apiconfigs?.getuserprotfolio}?walletAddress=${userAdress}`, {
        headers: {
          "Content-Type": `application/json`,
          token: AuthToken,
        },
      });
      return response?.data;
    } catch (error) {
      return error?.response?.data
    }
  };