export interface UserProps {
  _id?: string;
  email?: string;
  uname?: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
  isEmailConfirmed: boolean;
  subscription: string;
  recaptcha?: string;
}
