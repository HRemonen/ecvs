import axios from "axios";

import type { User } from '@backend/types';
import { ValidatedUser } from "@backend/utils/usersValidator";

const baseUrl = "/api/users";

const getUser = async (id: string): Promise<User & {id: string}> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUsers = async (): Promise<User & {id: string}[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createUser = async (newUser: ValidatedUser): Promise<User> => {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
}

export default { getUser, getUsers, createUser };
