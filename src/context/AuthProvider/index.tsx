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
  const userStorage = authService.getUserLocalStorage();
  const [user, setUser] = useState<IUser | null>(userStorage);

  useEffect(() => {
    // if (userStorage) setUser(userStorage);
    setInterceptors(userStorage);
  }, []);

  async function authenticate(email: string, password: string) {
    try {
      let response = await authService.login(email, password);
      const payload = { email, token: response.token };
      setUser(payload);
      setInterceptors(payload);
      authService.setUserLocalStorage(payload);
      return response;
    } catch (error) {
      throw error;
    }
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
