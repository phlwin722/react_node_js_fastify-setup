import { useState, createContext, useContext } from "react";

const StateContext = createContext({
  type: null,
  setType: () => {},
});

export const ContextProvider = ({ children }) => {
  const [type, _setType] = useState(localStorage.getItem("type_user") || "");

  const setType = (type) => {
    _setType(type);

    if (type) {
      localStorage.setItem("type_user", type);
    } else {
      localStorage.removeItem("type_user");
    }
  };

  return (
    <StateContext.Provider value={{ type, setType }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
