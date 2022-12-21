import axios from "axios";

import type { Ecv } from '@backend/types';
import type { ValidatedEcv } from '@backend/utils/ecvsValidator';

const baseUrl = "/api/ecvs";

interface Config {
  headers: {
    Authorization: string;
  }
}

let token = "";
const config: Config = {headers: { Authorization: "" }};

const setToken = (newToken: string) => {
  token = `bearer ${newToken}`;
  config.headers.Authorization = token;
};

const getEcv = async (id: string): Promise<Ecv> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getEcvs = async (): Promise<Ecv[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createEcv = async (newEcv: ValidatedEcv): Promise<Ecv> => {
  console.log("config", config)
  const response = await axios.post(baseUrl, newEcv, config);
  return response.data;
};

const removeEcv = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.status;
}

export default { setToken, getEcv, getEcvs, createEcv, removeEcv };