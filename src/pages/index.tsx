import { GetStaticProps } from 'next';
import { useState } from 'react';

import SearchInput from '@/components/SearchInput';
import Seo from '@/components/Seo';
import CountriesTable from '@/components/table/CountriesTable';

import { DataCountry } from '@/Types';

const HomePage = ({ countries }: { countries: DataCountry[] }) => {
  const [keyword, setKeyword] = useState<string>('');
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(keyword.toLowerCase()) ||
      country.region.toLowerCase().includes(keyword.toLowerCase()) ||
      country.subregion.toLowerCase().includes(keyword.toLowerCase())
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setKeyword(e.target.value);
  };
  return (
    <section className='layout'>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <div className='w-full'>
        <p className='my-3 text-base text-textColorSec'>
          Found {countries.length} countries
        </p>
        <SearchInput
          placeholder='Filter by Name, Region or Subregion'
          onChange={onInputChange}
        />
      </div>
      <CountriesTable countries={filteredCountries} />
    </section>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries: DataCountry[] = await res.json();

  return {
    props: {
      countries,
    },
  };
};
