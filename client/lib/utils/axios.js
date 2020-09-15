import axios from "axios";

import { SERVER_BASE_URL } from "./constant";
import localStorageService from "./localStorageService";

(function () {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      if (error.response.status !== 401) {
        return error.response;
      }

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorageService.getRefreshToken();

        return axios
          .post(`${SERVER_BASE_URL}/user/refresh`, {
            refreshToken,
          })
          .then((res) => {
            if (res.status === 201) {
              localStorageService.setAccessToken(res.data.accessToken);
              axios.defaults.headers.common["Authorization"] =
                "Token " + localStorageService.getAccessToken();
              return axios.request(originalRequest);
            }
          })
          .catch((error) => {
            return error.response;
          });
      }
    }
  );
})();
