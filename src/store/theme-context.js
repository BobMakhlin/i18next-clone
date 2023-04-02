import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const THEMES = ["dark", "light"];
const DEFAULT_THEME = "dark";
const LOCAL_STORAGE_KEY = "theme";

const ThemeContext = createContext({
  themesAvailable: THEMES,
  theme: DEFAULT_THEME,
  changeTheme: () => {
    // By default is a dummy empty function.
  },
});

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  useEffect(() => {
    const theme = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (theme) {
      setTheme(theme);
    }
  }, []);

  const changeTheme = useCallback((value) => {
    if (!THEMES.includes(value)) {
      throw new Error(`Theme ${value} is not supported.`);
    }

    setTheme(value);
    localStorage.setItem(LOCAL_STORAGE_KEY, value);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themesAvailable: THEMES, theme, changeTheme }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
export default ThemeContextProvider;
