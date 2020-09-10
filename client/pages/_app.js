import { CacheProvider } from "@emotion/core";
import { cache } from "emotion";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default MyApp;
