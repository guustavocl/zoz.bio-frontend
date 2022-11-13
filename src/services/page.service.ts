import { IUser } from "../types/IUser";
import { Api } from "./api";

class PageService {
  endpoint = "page";

  getPage = async (pagename: string) => {
    try {
      const request = await Api.get(`${this.endpoint}`, {
        params: { pagename },
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };

  createPage = async (pagename: String) => {
    try {
      const request = await Api.post(`${this.endpoint}/create`, { pagename });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };
}

export default new PageService();
