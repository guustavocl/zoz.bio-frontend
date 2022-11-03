import { IUser } from '../types/IUser';
import { Api } from './api';

class AuthService {
  endpoint = "auth";

  login = async(username: string, password: string) => {
    try {
      const request = await Api.post('login', {username, password});
      return request.data;
    } catch(error) { return null; }
  }

  setUserLocalStorage = (user: IUser | null ) => {
    localStorage.setItem('u', JSON.stringify(user));
  }
  
  getUserLocalStorage = () => {
    const json = localStorage.getItem('u');
    if(!json) return null;
    return JSON.parse(json);
  }

}

export default new AuthService();