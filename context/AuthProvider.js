import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase/firebase.config";
import nookies, { destroyCookie } from "nookies";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        destroyCookie(null, "token");
      } else {
        const token = await user.getIdToken();
        setUser(user);
        nookies.set(undefined, "token", token);
        nookies.set(undefined, "mail", user.email);
      }
    });
  }, []);

  const value = {
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
