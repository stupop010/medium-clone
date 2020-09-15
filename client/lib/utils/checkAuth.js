import jwt_decode from "jwt-decode";
import Router from "next/router";

const checkAuth = (user) => {
  if (!user) return false;

  const { accessToken } = user;
  const { exp } = jwt_decode(accessToken);

  //   Returns true if the expire time greater then the current time
  console.log(exp > new Date() / 1000);
  if (exp > new Date() / 1000) {
    return true;
  } else {
    // fetch a new accessToken
  }
  // return exp > new Date();
};

export default checkAuth;
