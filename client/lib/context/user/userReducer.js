import { initialState } from "./userState";

const UserReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };

    case "LOGOUT": {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
};

export default UserReducer;
