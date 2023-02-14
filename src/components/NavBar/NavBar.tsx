import { useEffect } from "react";
import { HiMoon, HiOutlineMoon } from "react-icons/hi";
import { useAppContext } from "@/context";

let storedTheme: string | null;
if (typeof window !== "undefined")
  storedTheme = localStorage.getItem("countriesTheme") ?? "light";

const NavBar = () => {
  const { globalState, setGlobalState } = useAppContext();

  useEffect(() => {
    setGlobalState(storedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = globalState;
    localStorage.setItem("countriesTheme", globalState ?? "light");
  }, [globalState]);

  const switchTheme = () => {
    setGlobalState((oldTheme: any) => (oldTheme === "dark" ? "light" : "dark"));
  };

  return (
    <div className="flex select-none w-full text-base h-24 md:h-20 justify-between items-center px-5 dark:bg-darkElmts">
      <h1 className="font-[800] lg:text-xl">Where in the world?</h1>
      <div className="font-[600] test-sm  flex justify-between items-center ">
        <span className=" cursor-pointer mr-3" onClick={() => switchTheme()}>
          {globalState == "dark" ? <HiMoon /> : <HiOutlineMoon />}
        </span>
        <p className=" capitalize w-[85px]">
          {globalState == "dark" ? "light" : "dark"} Mode
        </p>
      </div>
    </div>
  );
};

export default NavBar;
