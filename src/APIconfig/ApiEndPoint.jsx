import Apiconfigs from "./ApiConfig";

export const ConnectWalletApi = async (data, dispatch) => {
    let body = {
      email: data.email, //Replace with the Email,
      password: data.password, //Replace with the PassWord,
    };
    try {
      let response = await axios.post(Apiconfigs?.connectwallet, body, {
        headers: {
          "Content-Type": `application/json`,
        },
      });
      let Token = `Bearer ${response.data.token}`;
      console.log("response", response?.data);
      localStorage.setItem("token", Token);
      localStorage.setItem("userId", response.data.user_id ? response.data.user_id : response?.data?.user?.id);
      localStorage.setItem("roleID", response?.data?.user?.role_id)
      localStorage.setItem("google_id", response.data.user.google_id)
  
      WriteUserData(response.data.user.google_id, response?.data.user?.firstname + " " + response.data.user?.lastname, response.data.user?.email, response?.data.user?.profile, dispatch)
      return response.data;
    } catch (error) {
      return error.response.data
    }
  };