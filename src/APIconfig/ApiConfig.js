// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = 'http://54.255.201.157:2021' // staging
// export const baseurl = "https://node-ecommerce.mobiloitte.com/api/v1/"; // staging

let admin = `${baseurl}/api/v1/admin`
let user = `${baseurl}/api/v1/user`
let transaction = `${baseurl}/api/v1/transaction`

let brand = `${baseurl}/api/v1/brand`
const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
  myAccount: `${user}/getProfile`,
  connectwallet: `${user}/connectWallet`,
  coinlist: `${admin}/listCoin`,
  overview: `${admin}/overview`,

  supplyCoin: `${transaction}/supply`,
  getuserprotfolio: `${user}/getPortfolio`,
  profile: `${user}/getProfile`,

}

export default Apiconfigs
