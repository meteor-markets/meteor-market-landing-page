import axios from "axios";
import Apiconfigs from "./ApiConfig";

export const FetchCoinList = async (data, dispatch) => {
    
    try {
      let response = await axios.get(Apiconfigs?.coinlist, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      console.log("response",response?.data?.result);
      return response?.data?.result;
    } catch (error) {
      return error?.response?.data
    }
  };