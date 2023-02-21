import Image from "next/image";
import { useRouter } from "next/router";

const CountryPad: React.FC<{
  name: string;
  population: number;
  region: string;
  capital?: string;
  flag: string;
}> = ({ name, population, region, capital, flag }) => {
  const router = useRouter();
  const nfObject = new Intl.NumberFormat("en-US");
  const formatedPopulation = nfObject.format(population);
  return (
    <div
      className="flex flex-col bg-white dark:bg-darkElmts cursor-pointer h-[420px] md:h-[340px] hover:mx-[-10px] hover:md:m-[-8px] rounded-md"
      onClick={() => router.push(`/detail?name=${name}`)}
    >
      <div className="relative h-[48%] w-full rounded-md">
        <Image
          src={flag}
          alt={name}
          fill={true}
          className=" object-cover rounded-t-md "
          priority
        />
      </div>
      <div className="flex flex-col items-start pl-8 md:pl-6 pr-2 w-full  ">
        <p className="mt-9  md:mt-8 min-h-[62px] md:min-h-[50px] font-[800] text-xl md:text-base ">
          {name}
        </p>
        <div>
          <p className="mb-3">
            <span className="font-[600] mb-3">Population:</span>{" "}
            <span>{formatedPopulation}</span>
          </p>
          <p className="mb-3">
            <span className="font-[600]">Region:</span> <span>{region}</span>
          </p>
          <p>
            <span className="font-[600]">Capital:</span> <span>{capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryPad;
