import { createContext, useState } from "react";
import { setInterceptors } from "../../services/api";
import authService from "../../services/auth.service";
import { AuthProps } from "../../types/AuthProps";
import { UserProps } from "../../types/UserProps";

export interface AuthPropsProvider {
  children: JSX.Element;
}

export const AuthContext = createContext<AuthProps>({} as AuthProps);

export const AuthProvider = ({ children }: AuthPropsProvider) => {
  const userStorage = authService.getUserLocalStorage();
  const [user, setUser] = useState<UserProps | null>(userStorage);

  async function authenticate(email: string, password: string) {
    const response = await authService.login(email, password);
    const payload = { email, token: response.token };
    setUser(payload);
    setInterceptors(payload);
    authService.setUserLocalStorage(payload);
    return response;
  }

  function logout() {
    setUser(null);
    authService.setUserLocalStorage(null);
  }

  return <AuthContext.Provider value={{ ...user, authenticate, logout }}>{children}</AuthContext.Provider>;
};
