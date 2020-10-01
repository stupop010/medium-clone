import axios from "axios";

import { SERVER_BASE_URL } from "./constant";

// TODO: This is the same function as fetcher/userFetcher
const fetcherUser = async (url) => {
  const { data } = await axios.get(`${SERVER_BASE_URL}${url}`);
  return data;
};

export default fetcherUser;
