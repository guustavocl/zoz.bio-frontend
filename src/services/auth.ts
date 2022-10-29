import { Api } from "./api";
import { IUser } from "../context/AuthProvider/types";

export async function LoginRequest(username: string, password: string) {
  try {
    const request = await Api.post('login', {username, password});
    return request.data;
  } catch(error) { return null; }
}

export function setUserLocalStorage(user: IUser | null ) {
  localStorage.setItem('u', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('u');
  if(!json) return null;
  return JSON.parse(json);
}