import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";
const articleAPI = {
  create: async (article, tags, token) => {
    try {
      const response = await axios.post(
        `${SERVER_BASE_URL}/article/new`,
        JSON.stringify({ ...article, tags }),
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Token ${token}`,
          },
        }
      );

      return response;
    } catch (err) {
      return err.response;
    }
  },
};

export default articleAPI;
