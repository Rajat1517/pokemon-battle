import { createContext, useState } from "react";

export const UtilContext = createContext();

export const UtilProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  return (
    <UtilContext.Provider value={{ loading, setLoading }}>
      {children}
    </UtilContext.Provider>
  );
};
