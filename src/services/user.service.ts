import { IUser } from '../types/IUser';
import { Api } from './api';

class AuthService {
  endpoint = "user";

  register = async(values: IUser) => {
    try {
      const request = await Api.post('create', values);
      return request.data;
    } catch(error) { return null; }
  }


}

export default new AuthService();