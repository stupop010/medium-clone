import axios from "axios";

import localStorageService from "../utils/localStorageService";

import { SERVER_BASE_URL } from "../utils/constant";
const articleAPI = {
  create: async (article, tags) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/article/new`,
        JSON.stringify({ ...article, tags }),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ` + localStorageService.getAccessToken(),
          },
        }
      );
      console.log(response);
      return response;
    } catch (err) {
      console.log(err, "api");
      return err.response;
    }
  },
};

export default articleAPI;
