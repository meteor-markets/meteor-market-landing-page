import moment from "moment";
import { Contract } from "@ethersproject/contracts";

export function sortAddress(add) {
  const sortAdd = `${add?.slice(0, 6)}...${add?.slice(add.length - 4)}`;
  return sortAdd;
}

export function ShortThirtyString(add) {
  const sortAdd = `${add?.slice(0, 40)}...`;
  return sortAdd;
}
export function shortstring(add) {
  // if (add.length > 15) {
  const sortAdd = `${add?.slice(0, 15)}...${add?.slice(add.length - 10)}`;
  return sortAdd;
  // } else {
  // return add;
  // }
}
export function ShortStringAddress(add) {
  if (add.length > 8) {
    const sortAdd = `${add?.slice(0, 8)}...${add?.slice(add.length - 2)}`;
    return sortAdd;
  } else {
    return add;
  }
}
export function getSigner(library, account) {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(library, account) {
  return account ? getSigner(library, account) : library;
}

export function getContract(address, ABI, library, account) {
  return new Contract(address, ABI, getProviderOrSigner(library, account));
}
export const getBase64 = (file, cb) => {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    cb(reader.result);
  };
  reader.onerror = function (err) {
    console.log("Error: ", err);
  };
};
export const convertDateTime = (val) => {
  var tempDate = new Date(val);
  const toDateFormat = moment(tempDate).format("DD-MMM-yyyy hh:mm a");
  return toDateFormat;
};
