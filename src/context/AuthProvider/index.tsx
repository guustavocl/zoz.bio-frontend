import { createContext, useEffect, useState } from "react";
import { setInterceptors } from "../../services/api";
import authService from "../../services/auth.service";
import { IAuth } from "../../types/IAuth";
import { IUser } from "../../types/IUser";

export interface IAuthProvider {
  children: JSX.Element;
}

export const AuthContext = createContext<IAuth>({} as IAuth);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [user, setUser] = useState<IUser | null>();

  useEffect(() => {
    const user = authService.getUserLocalStorage();
    if (user) setUser(user);
    setInterceptors(user);
  }, []);

  async function authenticate(email: string, password: string) {
    const response = await authService.login(email, password);
    const payload = { token: response.token, email };
    setUser(payload);
    setInterceptors(payload);
    authService.setUserLocalStorage(payload);
  }

  function logout() {
    setUser(null);
    authService.setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ ...user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
