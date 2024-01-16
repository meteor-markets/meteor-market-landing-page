// export const baseurl = "http://172.16.2.13:3038"; //local

export const baseurl = "https://node-ecommerce.mobiloitte.com"; // staging
// export const baseurl = "https://node-ecommerce.mobiloitte.com/api/v1/"; // staging

let admin = `${baseurl}/api/v1/admin`;

let brand = `${baseurl}/api/v1/brand`;
const Apiconfigs = {
  homeBanner: `${admin}/listBanner`,
};

export default Apiconfigs;
