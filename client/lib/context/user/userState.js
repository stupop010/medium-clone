import { useReducer, createContext } from "react";

import UserReducer from "./userReducer";

const initialState = {
  user: {},
  isLoggedIn: false,
};

export const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const updateUser = (user) => {
    console.log("hello");
    dispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };

  return (
    <UserContext.Provider
      value={{
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
