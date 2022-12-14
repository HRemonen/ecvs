import axios from "axios";
import { Ecv } from '@backend/types'
import { ValidatedEcv } from '@backend/utils/ecvsValidator';

const baseUrl = "/api/ecvs";

interface Config {
  headers: {
    Authorization: string;
  }
};

let token: string = "";
let config: Config = {headers: { Authorization: "" }};

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
  config.headers.Authorization = token;
}

const getEcv = async (id: string): Promise<Ecv> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getEcvs = async (): Promise<Ecv[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createEcv = async (newEcv: ValidatedEcv): Promise<Ecv> => {
  const response = await axios.post(baseUrl, newEcv, config);
  return response.data;
};

export default { setToken, getEcv, getEcvs, createEcv };