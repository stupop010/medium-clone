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

      return response;
    } catch (err) {
      return err.response;
    }
  },

  addFollow: async (articleId) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/article/follow`, {
        articleId,
      });

      return response;
    } catch (err) {
      return err.response;
    }
  },

  createComment: (value) =>
    axios.post(`${SERVER_BASE_URL}/comment/new`, { ...value }),
};

export default articleAPI;
