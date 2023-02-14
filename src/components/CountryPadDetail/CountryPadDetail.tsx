import Image from "next/image";
import localData from "../../../data";
import useSWR from "swr";
import { useRouter } from "next/router";

const CountryPadDetail: React.FC<{
  name: string;
}> = ({ name }) => {
  const router = useRouter();
  const { data, error } = useSWR(
    "https://restcountries.com/v2/name/" + name,
    (...args) => fetch(...args).then((res) => res.json())
  );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-2xl font-[800]">
        Loading...
      </div>
    );
  const {
    flag,
    population,
    region,
    capital,
    nativeName,
    subregion,
    topLevelDomain,
    currencies,
    languages,
    borders,
  } = data[0];
  const borderCountries = borders?.map(
    (i: string) => localData.filter((j: any) => j.alpha3Code == i)[0].name
  );
  const nfObject = new Intl.NumberFormat("en-US");
  const formatedPopulation = nfObject.format(population);
  return (
    <div className="flex flex-col md:flex-row md:justify-between w-full h-full">
      <div className="relative w-full h-[250px] sm:h-[460px] md:h-[400px] ">
        <Image src={flag} alt={name} fill={true} className=" object-cover  " />
      </div>
      <div className="flex flex-col w-full mt-24 md:mt-12 md:ml-24 lg:ml-36 ">
        <p className=" min-h-[100px] md:min-h-[66px] font-[800] text-4xl md:text-3xl ">
          {name}
        </p>
        <div className="flex flex-col md:flex-row md:justify-between w-full">
          <div className="">
            <p className="mb-7 md:mb-3 ">
              <span className="font-[600]">Native Name:</span>{" "}
              <span>{nativeName}</span>
            </p>
            <p className="mb-7 md:mb-3">
              <span className="font-[600]">Population:</span>{" "}
              <span className="ordinal">{formatedPopulation}</span>
            </p>
            <p className="mb-7 md:mb-3">
              <span className="font-[600]">Region:</span> <span>{region}</span>
            </p>
            <p className="mb-7 md:mb-3">
              <span className="font-[600]">Sub Region:</span>{" "}
              <span>{subregion}</span>
            </p>
            <p>
              <span className="font-[600]">Capital:</span>{" "}
              <span>{capital}</span>
            </p>
          </div>
          <div className="mt-24 md:mt-0 ">
            <p className="mb-7 md:mb-3">
              <span className="font-[600]">Top Level Domain:</span>{" "}
              <span>{topLevelDomain}</span>
            </p>
            <p className="mb-7 md:mb-3">
              <span className="font-[600]">Currencies:</span>{" "}
              {currencies?.map((i: any) => (
                <span key={i.code}>{i.code}</span>
              ))}
            </p>
            <p>
              <span className="font-[600]">Languages:</span>{" "}
              {languages?.map((i: any, index: number) => (
                <span key={i.name}>
                  {i.name}
                  {index < languages.length - 1 ? <span>{", "} </span> : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row mt-20 md:mt-16">
          <p className="font-[600] text-3xl md:text-base mb-10 md:mb-0 md:mr-4 ">
            Border Countries:
          </p>
          <div className="grid grid-cols-3 md:grid-cols-2  lg:grid-cols-3 gap-5 md:gap-3 mb-32 md:mb-9">
            {borderCountries?.length && borderCountries?.length > 0
              ? borderCountries?.map((i: string) => (
                  <span
                    className="p-2 flex hover:font-[600] items-center cursor-pointer justify-center w-20 sm:w-44 md:w-24 text-sm sm:text-base   dark:bg-darkElmts rounded-md"
                    key={i}
                    onClick={() => router.push(`/detail?name=${i}`)}
                  >
                    {i}
                  </span>
                ))
              : "none"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryPadDetail;
