import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito_Sans } from "@next/font/google";
import { AppWrapper } from "@/context";
import { useEffect } from "react";
import { getEnvironmentData } from "worker_threads";

const nunito_Sans = Nunito_Sans({
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito_Sans.className}>
      <ClientSideTheme />
      <AppWrapper value={pageProps.value}>
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  );
}

function ClientSideTheme() {
  useEffect(() => {
    const storedTheme = JSON.parse(
      localStorage.getItem("countries") as string
    )?.theme;
    document.documentElement.className = storedTheme || "light";
  }, []);

  return null;
}

export default MyApp;
