import { useState, createContext, useContext } from "react";

const darkContext = createContext();

export function ProvideTheme({ children }) {
  const dark = useProvideDark();
  return (
    <darkContext.Provider value={dark}>
      <div className={`${dark.dark ? "dark" : ""}`}>{children}</div>
    </darkContext.Provider>
  );
}

export const useDark = () => {
  return useContext(darkContext);
};

function useProvideDark() {
  const [dark, setDark] = useState(false);

  return {
    dark,
    setDark,
  };
}
