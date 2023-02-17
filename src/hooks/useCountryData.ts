import useSWR, { SWRResponse } from "swr";

interface CountryData {
  flag: string;
  population: number;
  region: string;
  capital: string;
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  borders: string[];
}

interface BorderCountry {
  name: string;
  alpha3Code: string;
}

const useCountryData = (
  name: string,
  fields: string
): [CountryData | null, Error | null] => {
  const { data, error } = useSWR<CountryData[]>(
    `https://restcountries.com/v2/name/${name}?fields=${fields}`,
    async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    { revalidateOnMount: true, shouldRetryOnError: false }
  );

  const { data: borderCountries, error: borderError } = useSWR<BorderCountry[]>(
    () => {
      if (!data) return null;

      const { borders } = data[0];
      const codes = borders.join(";");
      return `https://restcountries.com/v2/alpha?codes=${codes}`;
    },
    async (url: string) => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
    { shouldRetryOnError: false }
  );

  const nfObject = new Intl.NumberFormat("en-US");

  if (error || borderError) {
    return [null, error ?? borderError];
  }

  if (!data || !borderCountries) {
    return [null, null];
  }

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
  } = data[0];
  const borderCountryNames = borderCountries.map((border) => border.name);

  return [
    {
      flag,
      population,
      region,
      capital,
      nativeName,
      subregion,
      topLevelDomain,
      currencies,
      languages,
      borders: borderCountryNames,
    },
    null,
  ];
};
