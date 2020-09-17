import { useReducer, createContext } from "react";

import UserReducer from "./userReducer";

export const initialState = {
  user: {},
  isLoggedIn: false,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const updateUser = (user) => {
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };

  const logoutUser = () => {
    console.log("logout");
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
