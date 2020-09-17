import axios from "axios";

import localStorageService from "./localStorageService";
import { SERVER_BASE_URL } from "./constant";

export default async function userFetcher() {
  // const accessToken = localStorageService.getAccessToken();

  const { data, status } = await axios.get(`${SERVER_BASE_URL}/user`);

  return { data, status };
}
