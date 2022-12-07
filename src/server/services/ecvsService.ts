import { Ecv } from "../types";
import EcvModel from "../models/ecv";

const getEcvs = async (): Promise<Ecv[]> => {
  const ecvs = await EcvModel
    .find({});
  return ecvs;
};

export default { getEcvs };