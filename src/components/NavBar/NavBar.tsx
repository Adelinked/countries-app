import { useEffect } from "react";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";
import { useAppContext } from "@/context";

let storedTheme: string | null;
if (typeof window !== "undefined") {
  storedTheme =
    JSON.parse(localStorage.getItem("countries") as string)?.theme ?? "light";
}
const NavBar = () => {
  const { globalState, setGlobalState } = useAppContext();
  useEffect(() => {
    setGlobalState(storedTheme ?? "light");
  }, []);

  useEffect(() => {
    if (!globalState) return;
    document.documentElement.className = globalState;
    localStorage.setItem("countries", JSON.stringify({ theme: globalState }));
  }, [globalState]);

  const switchTheme = () => {
    setGlobalState((oldTheme: any) => (oldTheme === "dark" ? "light" : "dark"));
  };

  return (
    <header className="flex select-none w-full text-base h-24 md:h-20 justify-between items-center px-5 bg-white dark:bg-darkElmts">
      <h1 className="font-[800] lg:text-xl">Where in the world?</h1>
      <div className="font-[600] test-sm  flex justify-between items-center ">
        <span className=" cursor-pointer mr-3" onClick={() => switchTheme()}>
          {globalState == "dark" ? <HiMoon /> : <HiOutlineMoon />}
        </span>
        <p className=" capitalize w-[85px]">
          {globalState == "dark" ? "light" : "dark"} Mode
        </p>
      </div>
    </header>
  );
};

export default NavBar;
