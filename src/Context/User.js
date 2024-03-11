import React, { createContext, useEffect, useState } from "react";
export const UserContext = createContext()


export default function AuthProvider(props) {
  const [accounts, setAccount] = useState();

  let data = {
    accounts,
    // seAcountDetails: (data) => setAccount(data)
  };

  return <UserContext.Provider value={data}>{props.children}</UserContext.Provider>
}
