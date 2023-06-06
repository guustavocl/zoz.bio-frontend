import { UserProps } from "./UserProps";

export interface AuthProps extends UserProps {
  authenticate: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
