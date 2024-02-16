import React, { createContext, useEffect, useState } from "react";
import { SUPPORTED_WALLETS } from "../connectors";
import { useWeb3React } from "@web3-react/core";
import { ACTIVE_NETWORK, NetworkDetails } from "../constants/";
import { toast } from "react-toastify";
import Web3 from "web3";
import axios from "axios";
import apiConfig from "src/APIconfig/ApiConfig";

export const UserContext = createContext();

const setTokenSession = (token) => {
  if (token) {
    sessionStorage.setItem("token", token);
  } else {
    // sessionStorage.removeItem("token");
  }
};

export default function AuthProvider(props) {
  const { activate, deactivate, account, library, chainId } = useWeb3React();
  const [isLogin, setIsLogin] = useState(false);
  const [isLogin1, setIsLogin1] = useState(false);
  const [errorMsg] = useState("");
  const [userData, setUserData] = useState();
  const [connectwalletBalance, setConnectwalletBalance] = useState(0);
  const [walletAddress, setWalletAddress] = useState("");
  const [profileData, setProfileData] = useState();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [subscritionList, setSubsritionList] = useState([]);
  const [mySubscriptionList, setMySubscription] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [provider, setProvider] = useState();
  const [accounts, setAccount] = useState();
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
let useraddress = sessionStorage?.getItem("userAddress")
    if (account ||useraddress ) {
      connectWalletAPICall(cancelTokenSource,useraddress);
      setWalletAddress(account||useraddress);
    } else {
      setIsLogin(false);
      setTokenSession(null);
    }
    return () => {
      cancelTokenSource.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, profileData]);

  useEffect(() => {
    if (profileData) {
      setIsAdmin(profileData.role === "ADMIN");
      getSubscription();
      getMySubscription();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);
  const disconnect = async () => {
    let isCheckProvider = sessionStorage.getItem("isProvider")
    let updateProvider = JSON.parse(isCheckProvider)
    await provider?provider.disconnect(): updateProvider.disconnect();
    setAccount();
    setProvider();

  };
  const connectWithProvider = async (provider) => {
    const cancelTokenSource = axios.CancelToken.source();
    try {
      if (!provider) throw Error("Wallet not found.");
      setProvider(provider);
      await provider.connect();
      if (provider.publicKey) {
        connectWalletAPICall(cancelTokenSource,provider.publicKey.toString());
        setAccount(provider.publicKey.toString());
        sessionStorage.setItem("isanotherWallet",true)
        sessionStorage.setItem("isProvider",JSON.stringify(provider.disconnect()))

      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSubscription = async () => {
    try {
      const res = await axios.get(apiConfig.subscriptionList);
      if (res.status === 200) {
        setSubsritionList(
          res.data.result.filter(
            (data) =>
              data.isDefaultJava !== false && data.isDefaultJava !== true
          )
        );
      }
    } catch (error) {
      console.log("ERROR", error);
    }
  };

  const getMySubscription = async () => {
    console.log("wprking....");
    try {
      const res = await axios.get(apiConfig.mySubscriptionPlan, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            "loginToken"
          )}`,
        },
      });
      if (res.data.status === 200) {
        setMySubscription(res.data.data);
      } else {
      }
    } catch (error) {
      console.log(">>>>", error);
    }
  };

  const connectWalletAPICall = async (cancelTokenSource,useraddress) => {
      try {
        const res = await axios.post(
          apiConfig.connectwallet,
          {
            walletAddress: account ||useraddress,
          },
          {
            cancelToken: cancelTokenSource && cancelTokenSource.token,

            headers: {
              authorization: `Bearer ${window.sessionStorage.getItem(
                "loginToken"
              )}`,
            },
          }
        );
        
        if (res.status === 200 || res.status === 205) {
          let token = `${res?.data?.result?.token}`
          sessionStorage.setItem("loginToken",token)
          sessionStorage.setItem("userAddress",res?.data?.result?.walletAddress)
setAccount(res?.data?.result?.walletAddress)
          setIsLogin(true);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        setTokenSession();
        console.log("ERROR", error);
        toast.error(error.message);
      }
    
  };

  //NETWORK CHECK AND SWICH NETWORK

  useEffect(() => {
    if (account && chainId) {
      if (chainId !== ACTIVE_NETWORK) {
        if (window.ethereum) {
          swichNetworkHandler();
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, account]);

  const swichNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + ACTIVE_NETWORK.toString(16) }],
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
      if (error.code === 4902) {
        addNetworkHandler();
      }
    }
  };

  const addNetworkHandler = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: NetworkDetails,
      });
    } catch (error) {
      console.log("ERROR", error);
      toast.warn(error.message);
    }
  };

  const getUserbalce = async () => {
    var web3 = new Web3(library.provider);
    const balance = await web3.eth.getBalance(account);
    const balanceImETH = await web3.utils.fromWei(balance);
    setConnectwalletBalance(parseFloat(balanceImETH).toFixed(2));
  };

  useEffect(() => {
    if (account) {
      setAccount(account)
      getUserbalce();
      getProfileHandler();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, library]);

  const connectToWallet = (data) => {
    try {
      const connector = data.connector;

      if (connector && connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined;
      }
     
     
      activate(connector, undefined, true).catch((error) => {
        if (error) {
          toast.error(JSON.stringify(error.message));
          console.log("errr",JSON.stringify(error.message),error.message);
          window.sessionStorage.removeItem("walletName");
          activate(connector);
        }
      });
    } catch (error) {
      
      toast.error(error.message);
    }
  };


  useEffect(() => {
    if (window.sessionStorage.getItem("walletName")) {
      const selectectWalletDetails = SUPPORTED_WALLETS.filter(
        (data) => data.name === window.sessionStorage.getItem("walletName")
      );
      if (selectectWalletDetails[0]?.data) {
        connectToWallet(selectectWalletDetails[0].data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); //eslint-disable-line

  const getProfileHandler = async () => {
    try {
      const res = await axios.get(apiConfig.myAccount, {
        headers: {
          token: `${window.sessionStorage.getItem(
            "loginToken"
          )}`,
        },
      });
      if (res.data.status === 200) {
        setProfileData(res.data.data);
        setIsLogin1(true);
      } else {
        setIsLogin1(false);
      }
      setIsLoadingData(false);
    } catch (error) {
      console.log("ERROR", error);
      // toast.error("something went wrong");
      setIsLogin1(false);
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("loginToken")) {
      getProfileHandler();
    } else {
      setIsLoadingData(false);
    }
  }, [isLogin1]);

  const [stakingData, setStakingData] = useState();
  const [setalite, setSetalite] = useState();
  const [taral, setTaral] = useState();
  const [rodmarsCoin, setRodmars] = useState();
  const [revolution, setREvolution] = useState();
  const getStakingData = async () => {
    try {
      const res = await axios.get(apiConfig.staking, {
        headers: {
          authorization: `Bearer ${window.sessionStorage.getItem(
            "loginToken"
          )}`,
        },
      });
      if (res.data.status === 200) {
        setStakingData(res.data.data);
        setSetalite(
          res.data.data.filter((data) => data.stakingName === "SATELLITE")
        );
        setTaral(
          res.data.data.filter((data) => data.stakingName === "TARALITY")
        );
        setRodmars(
          res.data.data.filter((data) => data.stakingName === "REDMARS")
        );
        setREvolution(
          res.data.data.filter((data) => data.stakingName === "REVOLUTION")
        );
      } else {
      }
      // setIsLoadingData(false);
    } catch (error) {
      console.log("ERROR", error);
      // toast.error("something went wrong");
      // setIsLogin1(false);
      // setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getStakingData();
  }, []);

  let data = {
    isLogin,
    walletAddress,
    errorMsg,
    isAdmin,
    userData,
    mySubscriptionList,
    connectwalletBalance,
    profileData,
    isLoadingData,
    subscritionList,
    setIsLogin,
    setIsLogin1,
    isLogin1,
    accounts,
    getStakingData: () => getStakingData(),
    getProfileHandler: () => getProfileHandler(),
    getMySubscription: () => getMySubscription(),
    getSubscription: () => getSubscription(),
    connetAnotherWallet: (data) => connectWithProvider(data),
    disconnectAnotherWallet: () => {
      setIsLogin(false);
      disconnect();
      setAccount()
      sessionStorage.removeItem("userAddress");
      sessionStorage.removeItem("isanotherWallet");
      sessionStorage.removeItem("loginToken");
      sessionStorage.removeItem("isProvider");



    },
    stakingData,
    setalite,
    taral,
    rodmarsCoin,
    revolution,
    // updateUser: (account) => {
    //   setSession(account);
    // },
    connectWallet: (data) => connectToWallet(data),
    disconnectWallet: () => {
      setIsLogin(false);
      deactivate();
      setAccount()
      sessionStorage.removeItem("userAddress");
      sessionStorage.removeItem("loginToken");
    },
    logoutLogin: () => {
      deactivate();
      setProfileData();
      setUserData();
      setIsLogin1(false);
      sessionStorage.removeItem("loginToken");
      setIsLogin(false);
      sessionStorage.removeItem("token");
      setIsAdmin(false);
    },
  };

  return (
    <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
  );
}
