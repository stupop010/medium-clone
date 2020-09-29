import axios from "axios";

import { SERVER_BASE_URL } from "./constant";

export default async function userFetcher() {
  const { data, status } = await axios.get(`${SERVER_BASE_URL}/user`);

  return { data, status };
}
