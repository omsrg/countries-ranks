import { GetStaticProps } from 'next';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import Seo from '@/components/Seo';

import { DataCountry } from '@/Types';

const getCountry = async (id: string) => {
  const res = await fetch(`https://restcountries.com/v2/alpha/${id}`);
  const data = await res.json();

  return data;
};

const Country = ({ country }: { country: DataCountry }) => {
  const [borders, setBorders] = useState<DataCountry[]>();

  useEffect(() => {
    const getBorders = async () => {
      if (country.borders !== undefined) {
        const dataBorders = await Promise.all(
          country.borders.map((border) => getCountry(border))
        );

        setBorders(dataBorders);
      }
    };

    getBorders();
  }, [country]);

  return (
    <>
      <Seo
        templateTitle={country.name}
        description='(population, area, region, subregion, languanges, etc)'
      />
      <div className='layout my-8 grid md:grid-cols-2 md:gap-4 lg:gap-8'>
        <div className='left'>
          <div className='flex flex-col items-center rounded-md bg-bgColorLight p-5 shadow-md'>
            <div className='flex justify-center'></div>
            <Image
              src={country.flag}
              alt={country.name}
              width={450}
              height={300}
              objectFit='contain'
            />
            <h1 className='text text-center'>{country.name}</h1>
            <h3 className='mt-1 mb-6 text-center text-sm '>{country.region}</h3>

            <div className='flex w-11/12 justify-between text-center sm:w-9/12'>
              <div className=''>
                <h3>Population</h3>
                <p>{country.population}</p>
              </div>

              <div className=''>
                <h3>
                  Area (km<sup>2</sup>)
                </h3>
                <p>{country.area || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='right'>
          <div className='rounded-md bg-bgColorLight p-5 shadow-md'>
            <h3 className='pb-0 sm:p-5 '>Details</h3>

            <div className='detail-rows'>
              <h4>Capital</h4>
              <p>{country.capital}</p>
            </div>

            <div className='detail-rows'>
              <h4>Subregion</h4>
              <p>{country.subregion}</p>
            </div>

            <div className='detail-rows'>
              <h4>Languanges</h4>
              <p>{country.languages.map(({ name }) => name).join(', ')}</p>
            </div>

            <div className='detail-rows'>
              <h4>Currency</h4>

              <p>
                {country.currencies?.map(({ name }) => name).join(', ') ??
                  'N/A'}
                {/* {country.currencies?.map((curr, idx) => (
                  <span key={idx}>{curr.name}</span>
                ))} */}
              </p>
            </div>

            <div className='detail-rows'>
              <h4>Native Name</h4>
              <p>{country.nativeName}</p>
            </div>

            <div className='detail-rows'>
              <h4>Gini</h4>
              <p>{country.gini || '0'} %</p>
            </div>

            <div className='sm:p-5'>
              <h4 className='mb-5 text-textColorSec'>Neighbouring Countries</h4>

              <div className='flex flex-wrap justify-center gap-6'>
                {borders?.map(({ flag, name }) => (
                  <div
                    key={flag}
                    className=' flex w-32 flex-col justify-center border p-2 shadow-sm'
                  >
                    <Image src={flag} width={100} height={80} alt={name} />
                    <h4 className='text-center'>{name}</h4>
                  </div>
                )) ?? '--'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Country;

export const getStaticPaths = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries: DataCountry[] = await res.json();

  const paths = countries.map((country: DataCountry) => ({
    params: { id: country.alpha3Code.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // const id = params?.id as string
  const country = await getCountry(params?.id as string);
  return {
    props: {
      country,
    },
    revalidate: 30,
  };
};
