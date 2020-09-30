import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const commentAPI = {
  createComment: (value) =>
    axios.post(`${SERVER_BASE_URL}/comment/new`, { ...value }),

  deleteComment: (commentId, articleId, limit, offset) =>
    axios.delete(`${SERVER_BASE_URL}/comment`, {
      params: { commentId, articleId, limit, offset },
    }),
};

export default commentAPI;
