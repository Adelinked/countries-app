import { useState, useRef, useEffect } from "react";
import Filter from "@/components/Filter";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { HiSearch } from "react-icons/hi";
import CountryPad from "@/components/CountryPad";
import useOnScreen from "@/hooks/useOnScreen";

let portionLen = 12;
export default function Home({ serverData }: { serverData: any[] }) {
  const serveDataLen = serverData.length;
  const [renderedData, setRendredData] = useState(
    serveDataLen > portionLen ? serverData.slice(0, portionLen) : serverData
  );
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const bottomRef = useRef(null);
  const bottomRefValue = useOnScreen(bottomRef);

  useEffect(() => {
    if (renderedData.length >= serveDataLen) return;
    let pageData = serverData;
    pageData =
      search.length > 0
        ? pageData.filter((i: any) =>
            i.name.toLowerCase().includes(search.toLowerCase())
          )
        : pageData;
    pageData =
      region.length > 0
        ? pageData.filter((i: any) => i.region == region)
        : pageData;
    const additionalData = [
      ...pageData.slice(renderedData.length, renderedData.length + portionLen),
    ];
    if (bottomRefValue) {
      setRendredData([...renderedData, ...additionalData]);
    }
  }, [bottomRefValue]);

  useEffect(() => {
    if (!region && !search) return;
    let pageData = serverData;
    if (search.length > 0) {
      pageData = pageData.filter((i: any) =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (region.length > 0) {
      pageData = pageData.filter((i: any) => i.region == region);
    }

    pageData =
      pageData.length > portionLen ? pageData.slice(0, portionLen) : pageData;

    setRendredData(pageData);
  }, [region, search]);

  return (
    <div className="text-sm w-full min-h-screen bg-lightBg dark:bg-darkBg dark:text-white ">
      <Head>
        <title>Countries App</title>
        <meta name="description" content="rest api countries app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="bg-lightBg dark:bg-darkMainBg text-sm my-7 md:my-12 mx-5 md:mx-20 pb-20 md:pb-11">
        <div className="flex flex-col md:flex-row justify-between select-none ">
          <div className="select-none flex items-center md:w-[390px] lg:w-[450px] px-10 md:px-5 py-4 rounded-md text-lightInput dark:text-white bg-white dark:bg-darkElmts">
            {" "}
            <HiSearch className="mr-8 w-5 h-5" />
            <input
              placeholder="Search for a country... "
              className="bg-white dark:bg-darkElmts w-full p-1"
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>
          <Filter region={region} setRegion={setRegion} />
        </div>
        {renderedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-10 w-full mt-12 px-2 sm:px-12 md:px-0 ">
            {renderedData.map((i: any, index: number) => (
              <CountryPad key={i.name} {...i} num={index} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[200px] text-2xl font-[800]">
            No Country Found
          </div>
        )}
        <div ref={bottomRef} />
      </main>
      <footer className="text-center text-sm">
        Challenge by{" "}
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
          className="font-[600]"
        >
          Frontend Mentor
        </a>
        . Coded by{" "}
        <a
          href="https://adelinked.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="font-[600]"
        >
          Adelinked
        </a>
        .
      </footer>
    </div>
  );
}

export async function getServerSideProps({ req, res }: { req: any; res: any }) {
  res.setHeader(
    "Cache-Control",
    "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800"
  );
  const responce = await fetch(
    `https://restcountries.com/v2/all?fields=name,population,region,capital,flag`
  );
  const serverData = await responce.json();
  return { props: { serverData } };
}
