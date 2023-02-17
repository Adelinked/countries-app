import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito_Sans } from "@next/font/google";
import { AppWrapper } from "@/context";
const nunito_Sans = Nunito_Sans({
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito_Sans.className}>
      <AppWrapper value={pageProps.value}>
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  );
}

export default MyApp;
