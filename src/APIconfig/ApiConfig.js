// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = 'http://13.214.26.3:2021' // staging
// export const baseurl = "https://node-ecommerce.mobiloitte.com/api/v1/"; // staging
// export const baseurl = "http://192.168.1.40:2021"

let admin = `${baseurl}/api/v1/admin`
let user = `${baseurl}/api/v1/user`
let transaction = `${baseurl}/api/v1/transaction`

let brand = `${baseurl}/api/v1/brand`
const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
  myAccount: `${user}/getProfile`,
  connectwallet: `${user}/connectWallet`,
  coinlist: `${user}/listCoin`,
  overview: `${user}/overview`,

  supplyCoin: `${user}/supply`,
  getuserprotfolio: `${user}/getPortfolio`,
  profile: `${user}/getProfile`,

}

export default Apiconfigs
