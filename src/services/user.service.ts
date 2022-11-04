import { IUser } from "../types/IUser";
import { Api } from "./api";

class AuthService {
  endpoint = "user";

  register = async (values: IUser) => {
    try {
      const request = await Api.post(`${this.endpoint}/create`, values);
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };
}

export default new AuthService();
