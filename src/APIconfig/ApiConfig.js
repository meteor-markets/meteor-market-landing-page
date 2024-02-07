// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = "http://3.108.32.168"; // staging
// export const baseurl = "https://node-ecommerce.mobiloitte.com/api/v1/"; // staging

let admin = `${baseurl}/api/v1/admin`;
let user = `${baseurl}/api/v1/user`;
let transaction = `${baseurl}/api/v1/transaction`;

let brand = `${baseurl}/api/v1/brand`;
const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
  connectwallet: `${user}/connectWallet`,
  coinlist: `${admin}/listCoin`,
  supplyCoin: `${transaction}/supply`,



};

export default Apiconfigs;
