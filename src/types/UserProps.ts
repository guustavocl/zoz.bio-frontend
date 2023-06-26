export interface UserProps {
  _id?: string;
  email?: string;
  uname?: string;
  password?: string;
  cpassword?: string;
  token?: string;
  isEmailConfirmed: boolean;
  subscription: string;
}
