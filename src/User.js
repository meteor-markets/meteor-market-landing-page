import React, { createContext, useEffect, useState } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
export const UserContext = createContext();


export default function AuthProvider(props) {
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
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
 console.log("wallet",wallet,);
  useEffect(() => {
    if (wallet?.provider) {
        console.log("wallet?.provider",wallet?.provider);
      const { name, avatar } = wallet?.accounts[0].ens ?? {};
      setAccount({
        address: wallet.accounts[0].address,
        balance: wallet.accounts[0].balance,
        ens: { name, avatar: avatar?.url }
      });
    }
  }, [wallet]);

  useEffect(() => {
    // If the wallet has a provider than the wallet is connected
    if (wallet?.provider) {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
      // if using ethers v6 this is:
      // ethersProvider = new ethers.BrowserProvider(wallet.provider, 'any')
    }
  }, [wallet]);



  const [stakingData, setStakingData] = useState();
  const [setalite, setSetalite] = useState();
  const [taral, setTaral] = useState();
  const [rodmarsCoin, setRodmars] = useState();
  const [revolution, setREvolution] = useState();
 
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
    connectAllWallet:()=>connect(),

    stakingData,
    setalite,
    taral,
    rodmarsCoin,
    revolution,
    // updateUser: (account) => {
    //   setSession(account);
    // },
    disconnectWallet: () => {
      setIsLogin(false);
      setAccount()
      sessionStorage.removeItem("userAddress");
      sessionStorage.removeItem("loginToken");
    },
    logoutLogin: () => {
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
