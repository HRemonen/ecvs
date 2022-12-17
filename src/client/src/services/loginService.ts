import axios from "axios";

import { UserLogin, AuthenticatedUser } from "src/types";

const baseUrl = "/api/login";

const login = async (credentials: UserLogin): Promise<AuthenticatedUser> => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };