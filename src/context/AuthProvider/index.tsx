import React, {createContext, useEffect, useState} from "react";
import { getUserLocalStorage, LoginRequest, setUserLocalStorage } from "../../services/auth";
import { IAuth, IAuthProvider, IUser } from "./types";

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({children}: IAuthProvider) => {

  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = getUserLocalStorage();
    if(user)
      setUser(user);
  }, []);
  
  async function authenticate(username: string, password: string) {
    const response = await LoginRequest(username, password);
    const payload = {token: response.token, username};
    setUser(payload);
    setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }
  
  return (
    <AuthContext.Provider value={{...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  )

}