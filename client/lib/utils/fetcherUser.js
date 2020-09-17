import axios from "axios";

import { SERVER_BASE_URL } from "./constant";

const fetcherUser = async (url) => {
  const { data } = await axios.get(`${SERVER_BASE_URL}${url}`);
  return data;
};

export default fetcherUser;
