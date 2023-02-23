import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Nunito_Sans } from "@next/font/google";
import { AppWrapper, useAppContext } from "@/context";
import { useEffect } from "react";

const nunito_Sans = Nunito_Sans({
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={nunito_Sans.className}>
      <AppWrapper value={pageProps.value}>
        <ClientSideTheme />
        <Component {...pageProps} />
      </AppWrapper>
    </div>
  );
}

function ClientSideTheme() {
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    const storedTheme = JSON.parse(
      localStorage.getItem("countries") as string
    )?.theme;
    document.documentElement.className = storedTheme || "light";
    if (!globalState) {
      setGlobalState(storedTheme);
    }
  }, []);

  return null;
}

export default MyApp;
