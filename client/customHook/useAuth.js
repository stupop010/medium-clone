import { useState, useEffect, useContext } from "react";
import useSWR from "swr";

import { UserContext } from "../lib/context/user/userState";
import userFetcher from "../lib/utils/userFetcher";

const useAuth = () => {
  const { updateUser, user, isLoggedIn } = useContext(UserContext);

  const { data, error } = useSWR("api_user", userFetcher);

  const loading = !data && !error;

  useEffect(() => {
    updateUser(data);
  }, [data]);

  return {
    loading,
    user,
    isLoggedIn,
  };
};

export default useAuth;
