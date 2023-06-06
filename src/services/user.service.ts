import { UserProps } from "../types/UserProps";
import { Api } from "./api";

class AuthService {
  endpoint = "user";

  getUser = async (email: string) => {
    try {
      const request = await Api.get(`${this.endpoint}`, {
        params: { email },
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };

  register = async (values: UserProps) => {
    try {
      const request = await Api.post(`${this.endpoint}/create`, values);
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };

  sendConfirmEmail = async (email: string, recapthca?: string) => {
    try {
      const request = await Api.post(`${this.endpoint}/send_confirm_email`, {
        email,
        recapthca,
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };

  confirmEmail = async (email: string, token: string) => {
    try {
      const request = await Api.post(`${this.endpoint}/confirm_email`, {
        email,
        token,
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };
}

export default new AuthService();
