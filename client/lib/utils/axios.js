import axios from "axios";

import { SERVER_BASE_URL } from "./constant";
import localStorageService from "./localStorageService";

(function () {
  axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorageService.getAccessToken();
      if (accessToken) {
        config.headers["Authorization"] = "Token " + accessToken;
      }

      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
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
          .then(async (res) => {
            if (res.status === 201) {
              localStorageService.setAccessToken(res.data.accessToken);

              axios.defaults.headers.common["Authorization"] =
                "Token " + localStorageService.getAccessToken();

              return axios.request(originalRequest);
            }

            if (res.status === 403) {
              return res;
            }
          })
          .catch((error) => {
            return error.response;
          });
      }
    }
  );
})();
