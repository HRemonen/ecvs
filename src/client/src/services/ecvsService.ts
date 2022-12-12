import axios from "axios";
import { Ecv } from '@backend/types'

const baseUrl = "/api/ecvs";

const getEcvs = async (): Promise<Ecv[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};


export default { getEcvs };