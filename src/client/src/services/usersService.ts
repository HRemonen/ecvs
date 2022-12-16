import axios from "axios";
import { User } from '@backend/types';

const baseUrl = "api/users";

const getUser = async (id: string): Promise<User & {id: string}> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUsers = async (): Promise<User & {id: string}[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export default { getUser, getUsers };
