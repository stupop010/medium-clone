const ACCESS = "access";
const REFRESH = "refresh";

const localStorageService = {
  setLocalStorageTokens: function (access, refresh) {
    window.localStorage.setItem(ACCESS, access);
    window.localStorage.setItem(REFRESH, refresh);
  },

  setAccessToken: function (token) {
    window.localStorage.setItem(ACCESS, token);
  },

  getRefreshToken: function () {
    return window.localStorage.getItem(REFRESH);
  },

  getAccessToken: function () {
    return window.localStorage.getItem(ACCESS);
  },
};

export default localStorageService;
