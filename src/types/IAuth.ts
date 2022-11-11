import { IUser } from "./IUser";

export interface IAuth extends IUser {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
