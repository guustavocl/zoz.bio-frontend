import { ILink } from "../types/ILink";
import { Api } from "./api";

class LinkService {
  endpoint = "link";

  getFolders = async (pagename: string) => {
    try {
      const request = await Api.get(`${this.endpoint}/folders`, {
        params: { pagename },
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };

  createLink = async (link: ILink, pagename: string) => {
    try {
      const request = await Api.post(`${this.endpoint}/create`, {
        link,
        pagename,
      });
      return request.data;
    } catch (error: any) {
      throw error && error.response ? error.response.data : error;
    }
  };
}

export default new LinkService();
