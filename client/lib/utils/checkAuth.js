import jwt_decode from "jwt-decode";

const checkAuth = (user) => {
  if (!user) return false;

  const { exp } = jwt_decode(user.token);

  //   Returns true if the expire time greater then the current time
  console.log(exp);
  console.log(new Date().toTimeString());
  console.log(exp < new Date() / 1000);
  return exp > new Date();
};

export default checkAuth;
