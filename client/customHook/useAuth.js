import { useEffect, useContext } from "react";
import useSWR from "swr";

import { UserContext } from "../lib/context/user/userState";
import userFetcher from "../lib/utils/userFetcher";
import localStorageService from "../lib/utils/localStorageService";

const useAuth = () => {
  const { updateUser, logoutUser, user, isLoggedIn } = useContext(UserContext);

  const { data, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;

  console.log(data);

  useEffect(() => {
    if (!data) return;
    console.log(data);
    if (data.status === 403) {
      if (data.data.message.includes("Refresh expired")) {
        logoutUser();
        // TODO:
        // Remove tokens from local storage.
        // localStorageService.removeTokens();
      }
    } else {
      updateUser(data);
    }
  }, [data]);

  return {
    loading,
    user,
    isLoggedIn,
  };
};

export default useAuth;
