// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = "http://3.108.32.168"; // staging

let admin = `${baseurl}/api/v1/admin`;
let user = `${baseurl}/api/v1/user`;
let transaction = `${baseurl}/api/v1/transaction`;

const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
  myAccount: `${user}/getProfile`,
  connectwallet: `${user}/connectWallet`,
  coinlist: `${admin}/listCoin`,
  overview: `${admin}/overview`,

  supplyCoin: `${transaction}/supply`,
  getuserprotfolio: `${user}/getPortfolio`,
};

export default Apiconfigs;
