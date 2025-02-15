// AuthProvider: En komponent som tillhandahåller autentiseringstjänster och state till hela applikationen.
// Den läser token från localStorage vid första rendering och hanterar utloggning.

// useAuth: En anpassad hook som ger tillgång till autentiseringstjänster från Context.

// Context: Gör det möjligt för barnkomponenter att få tillgång till autentiseringstjänster utan att behöva props-drilling.
// Genom att använda denna Context kan du centralisera autentisering i din applikation och enkelt dela autentiseringstillstånd
// och funktioner mellan olika komponenter.

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const defaultState = {
  user: null,
  token: null,
  setToken: () => {},
  logout: () => {},
};

const AuthContext = createContext(defaultState);

function AuthProvider({ children }) {
  const [token, setToken] = useState(defaultState.token);

  useEffect(() => {
    const _token = localStorage.getItem("@library/token");
    if (_token) {
      setToken(_token);
    }
  }, []);

  function logout() {
    localStorage.removeItem("@library/token");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user: null,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
