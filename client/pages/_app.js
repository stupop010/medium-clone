import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";

import { UserProvider } from "../lib/context/user/userState";
import "../styles/globals.css";

// Pagination Styles
import "rc-pagination/assets/index.css";

import "../lib/utils/axios";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </UserProvider>
  );
}

export default MyApp;
