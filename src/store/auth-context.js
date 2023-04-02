import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {
    // By default is a dummy empty function.
  },
  onLogin: (email, password) => {
    // By default is a dummy empty function.
  },
});

const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInformation === "1") {
      setIsLoggedIn(true);
    }
  }, []);
  
  const logoutHandler = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }, []);

  const loginHandler = useCallback(() => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
