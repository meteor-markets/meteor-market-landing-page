// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = "https://defiproject.onrender.com"; // staging
// export const baseurl = "https://node-ecommerce.mobiloitte.com/api/v1/"; // staging

let admin = `${baseurl}/api/v1/admin`;
let user = `${baseurl}/api/v1/user`;


let brand = `${baseurl}/api/v1/brand`;
const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
  connectwallet: `${user}/connectWallet`,
  coinlist: `${admin}/listCoin`,


};

export default Apiconfigs;
