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
  let tokenAddrss = sessionStorage.getItem("loginToken")
  let AuthToken = ""
  if (tokenAddrss) {
    AuthToken = sessionStorage.getItem("loginToken").split(" ")[1];

  }
  try {
    let response = await axios.post(Apiconfigs?.supplyCoin, body, {
      headers: {
        "Content-Type": `application/json`,
        token: AuthToken,
      },
    });
    return response?.data?.result;
  } catch (error) {
    return error?.response?.data
  }
};
export const FetchUserPortfolio = async (data, dispatch) => {
  let userAdress = sessionStorage.getItem("userAddress");
  let tokenAddrss = sessionStorage.getItem("loginToken")
  let AuthToken = ""
  if (tokenAddrss) {
    AuthToken = sessionStorage.getItem("loginToken").split(" ")[1];

  }


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
export const FetchOverview = async (data, dispatch) => {
  let tokenAddrss = sessionStorage.getItem("loginToken")
  let AuthToken = ""
  if (tokenAddrss) {
    AuthToken = sessionStorage.getItem("loginToken").split(" ")[1];

  }
  try {
    let response = await axios.get(Apiconfigs?.overview, {
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