import { Children, createContext, useState } from "react";

export const TokenContext = createContext();

export const TokenContextProvider = ({ children }) => {
  const [changeState, setChangeState] = useState();
  <TokenContext.Provider>{children}</TokenContext.Provider>;
};
