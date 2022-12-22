import { RgbaColor } from "react-colorful";
import { ILink } from "../types/ILink";
import { IPageSocialMedia } from "../types/IPage";
import { IUser } from "../types/IUser";
import { Api } from "./api";

class LinkService {
  endpoint = "link";

  // getPage = async (pagename: string) => {
  //   try {
  //     const request = await Api.get(`${this.endpoint}`, {
  //       params: { pagename },
  //     });
  //     return request.data;
  //   } catch (error: any) {
  //     throw error && error.response ? error.response.data : error;
  //   }
  // };

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
