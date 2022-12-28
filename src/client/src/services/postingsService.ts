import axios from "axios";

import { config } from "./ecvsService";

import type { Posting } from "@backend/types";
import type { ValidatedPosting } from "@backend/utils/postingsValidator"

const baseUrl = "/api/postings"

const getPosting = async (id: string): Promise<Posting> => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const getPostings = async (): Promise<Posting[]> => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createPosting = async (newPosting: ValidatedPosting): Promise<Posting> => {
  const response = await axios.post(baseUrl, newPosting);
  return response.data;
};

const applyPosting = async (id: string, ecv: string) => {
  const response = await axios.post(`${baseUrl}/${id}/apply`, { ecv }, config);
  return response.status;
}

export default { getPosting, getPostings, createPosting, applyPosting }