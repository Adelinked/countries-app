import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filter: React.FC<{
  region: string;
  setRegion: (region: string) => void;
}> = ({ region, setRegion }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className=" select-none relative flex items-center w-[250px] md:w-[200px] mt-12 md:mt-0 px-8 md:px-6 py-6 bg-white dark:bg-darkElmts rounded-md ">
      <p
        className=" w-full bg-white dark:bg-darkElmts cursor-pointer "
        onClick={() => {
          setOpen((o) => !o);
          //setRegion("");
        }}
      >
        Filter by Region
      </p>
      <span
        className="cursor-pointer text-lg"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
      </span>
      {open ? (
        <div className="w-full z-10 absolute left-0 top-[105%] flex flex-col bg-white pt-6 dark:bg-darkElmts rounded-md border-red-500 ">
          {regions.map((i) => (
            <span
              className={`flex items-center px-8 md:px-6 min-h-[42px] md:min-h-[36px] cursor-pointer  hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white ${
                region == i ? "font-[800] text-base" : ""
              }`}
              key={i}
              onClick={() => {
                setRegion(i);
                setOpen(false);
              }}
            >
              {i}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Filter;
