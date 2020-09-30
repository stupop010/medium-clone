import { useContext } from "react";

import { UserContext } from "../../lib/context/user/userState";

import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
