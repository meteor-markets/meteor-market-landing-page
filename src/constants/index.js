export const NetworkContextName = "Smart Chain";
export const ACTIVE_NETWORK = 97;
export const deadAddress = "0x0000000000000000000000000000000000000000";
export const textDeadAddress =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const factoryContractAdress =
  "0x0aAd5dDdeee80530FA59bE9672A92D109e1E4bAC";
export const liquidityLockerAddress =
  "0x742eAAE138e7B0980f91fB9D0716Ee6F163775cd";

export const default_RPC_URL = "https://bsc-dataseed.binance.org/";

export const stakeListAddress = "0x0a97f3fa0aa7e8a0b7801d16e0fea731c4be7ed4"; //Satellite
export const busdStakingAddress = "0x67224ee8546b79f2e47bce2e0ada2c4112bd2ba5"; //Tarality
export const stakeListAddress3 = "0xb31669bd0e438efc020577ae4f76b8fa29eb64e5"; //Redmars
export const stakeListAddress4 = "0xba7b60327bd096ec27f1f5373050b98bede59347"; //Revolution

export const NetworkDetails = [
  {
    chainId: "0x38",
    chainName: "Smart Chain",
    nativeCurrency: {
      name: "BNB",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc-dataseed.binance.org/"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
];

export const getPromoteFees = (days) => {
  switch (days.toString()) {
    case "1":
      return 0.1;
    case "2":
      return 0.2;
    case "3":
      return 0.3;
  }
};

export const getStakeAddress = (tabview) => {
  switch (tabview) {
    case "Satellite":
      return stakeListAddress;
    case "Taral":
      return busdStakingAddress;
    case "BTC":
      return stakeListAddress3;
    case "ETH":
      return stakeListAddress4;
  }
};

export const getStakeAddressByCoin = (tabview) => {
  switch (tabview) {
    case "SATELLITE":
      return stakeListAddress;
    case "TARALITY":
      return busdStakingAddress;
    case "REDMARS":
      return stakeListAddress3;
    case "REVOLUTION":
      return stakeListAddress4;
  }
};

export const stakeCoinList = [
  {
    value: "SATELLITE",
    label: "SATELLITE",
  },
  {
    value: "TARALITY",
    label: "TARALITY",
  },
  {
    value: "REDMARS",
    label: "REDMARS",
  },
  {
    value: "REVOLUTION",
    label: "REVOLUTION",
  },
];

export const combine = (a, min) => {
  var fn = function (n, src, got, all) {
    if (n == 0) {
      if (got.length > 0) {
        all[all.length] = got;
      }
      return;
    }
    for (var j = 0; j < src.length; j++) {
      fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
    }
    return;
  };
  var all = [];
  for (var i = min; i < a.length; i++) {
    fn(i, a, [], all);
  }
  all.push(a);
  return all;
};
