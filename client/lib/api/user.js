import axios from "axios";

import { SERVER_BASE_URL } from "../utils/constant";

const userAPI = {
  login: async (values) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/user/login`, {
        ...values,
      });

      return response;
    } catch (err) {
      return err.response;
    }
  },
  register: async (values) => {
    try {
      const response = await axios.post(`${SERVER_BASE_URL}/user/register`, {
        ...values,
      });

      return response;
    } catch (err) {
      return err.response;
    }
  },
  // checkUser: async () => {
  //   try {
  //     const respinse = await axios.get(`${SERVER_BASE_URL}/user/check-auth`)
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};

export default userAPI;
