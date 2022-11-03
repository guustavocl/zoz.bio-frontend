import { IUser } from "./IUser";

export interface IAuth extends IUser {
  authenticate: (username: string, password: string) => Promise<void>;
  logout: () => void;
}