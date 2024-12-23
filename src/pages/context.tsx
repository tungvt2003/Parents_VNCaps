import React, { createContext, useState } from "react";

const Context = createContext<{
  inputData: string;
  setInputData: React.Dispatch<React.SetStateAction<string>>;
}>({
  inputData: "",
  setInputData: () => {},
});

export const ContextProvider = ({ children }) => {
  const [inputData, setInputData] = useState("");

  return (
    <Context.Provider value={{ inputData, setInputData }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
