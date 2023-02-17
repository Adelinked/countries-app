import { useState } from "react";
import Filter from "@/components/Filter";
import NavBar from "@/components/NavBar";
import Head from "next/head";
import { HiSearch } from "react-icons/hi";
import CountryPad from "@/components/CountryPad";
export default function Home({ serverData }: { serverData: any[] }) {
  let pageData = serverData;

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

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

  return (
    <div className="text-sm w-full min-h-screen bg-lightBg dark:bg-darkBg dark:text-white ">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="rest api countries app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className=" dark:bg-darkMainBg text-sm my-7 md:my-12 mx-5 md:mx-20 pb-20 md:pb-11">
        <div className="flex flex-col md:flex-row justify-between select-none ">
          <div className="select-none flex items-center md:w-[390px] lg:w-[450px] px-10 md:px-5 py-4 rounded-md text-lightInput dark:text-white dark:bg-darkElmts">
            {" "}
            <HiSearch className="mr-8 w-5 h-5" />
            <input
              placeholder="Search for a country... "
              className=" dark:bg-darkElmts w-full p-1"
              onChange={(e) => setSearch(e.target.value)}
            />{" "}
          </div>
          <Filter region={region} setRegion={setRegion} />
        </div>
        {pageData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 md:gap-10 w-full mt-12 px-2 sm:px-12 md:px-0 ">
            {pageData.map((i: any, index: number) => (
              <CountryPad key={i.name} {...i} num={index} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-[200px] text-2xl font-[800]">
            Loading...
          </div>
        )}
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
