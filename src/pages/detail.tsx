import NavBar from "@/components/NavBar";
import Head from "next/head";
import CountryPadDetail from "@/components/CountryPadDetail";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { name } = router.query;
  return (
    <div className="text-sm w-full bg-lightBg dark:bg-darkBg dark:text-white">
      <Head>
        <title>Countries App</title>
        <meta name="description" content="rest api countries app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main className="text-base min-h-screen mt-20 md:pb-80  mx-14 md:mx-20">
        <button
          onClick={() => router.push("/")}
          className=" flex items-center bg-white dark:bg-darkElmts px-12 md:px-8 py-5 md:py-4 mb-32 md:mb-20 rounded-md hover:text-white hover:bg-black hover:dark:text-black hover:dark:bg-white  select-none"
        >
          <span className="flex items-center">
            {" "}
            <BsArrowLeft className="mr-4 md:mr-3 text-xl" /> Back
          </span>
        </button>
        <CountryPadDetail name={String(name)} />
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
