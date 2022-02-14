import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

import UnstyledLink from '@/components/links/UnstyledLink';

import { DataCountry } from '@/Types';

type CountriesProps = {
  countries: DataCountry[];
};

type SortOrders = 'asc' | 'desc';
type SortKeys = keyof Pick<
  DataCountry,
  'name' | 'population' | 'area' | 'subregion' | 'region'
>;

type OrderProps = {
  data: DataCountry[];
  sortOrder: SortOrders;
  sortKey: SortKeys;
};

const orderBy = ({ data, sortKey, sortOrder }: OrderProps) => {
  if (sortOrder === 'asc') {
    return [...data].sort((a, b) => (a[sortKey] > b[sortKey] ? 1 : -1));
  }

  if (sortOrder === 'desc') {
    return [...data].sort((a, b) => (a[sortKey] > b[sortKey] ? -1 : 1));
  }
};

const CountriesTable = ({ countries }: CountriesProps) => {
  const [sortKey, setSortKey] = useState<SortKeys>('name');
  const [sortOrder, setSortOrder] = useState<SortOrders>('asc');

  const orderedCountries = orderBy({
    data: countries,
    sortKey: sortKey,
    sortOrder: sortOrder,
  });

  const setSortKeyAndOrder = (key: SortKeys) => {
    setSortKey(key);

    if (sortOrder === 'asc') {
      setSortOrder('desc');
    }

    if (sortOrder === 'desc') {
      setSortOrder('asc');
    }
  };

  return (
    <div className='my-8'>
      <table className='w-full  border-separate [border-spacing:0_15px]'>
        <thead className='py-6'>
          <tr className='w-full font-bold text-textColorSec'>
            {tableHead.map((thead, idx) => (
              <th
                key={idx}
                className={clsx(
                  'tracking-wider sm:p-5',
                  thead.key === 'name' && 'sm:w-72 md:w-72',
                  thead.key === 'population' && 'md:w-60',
                  thead.key === 'area' && 'md:w- hidden sm:table-cell md:w-60',
                  thead.key === 'region' && 'hidden w-40 md:table-cell',
                  thead.key === 'subregion' && 'hidden w-56 lg:table-cell '
                )}
              >
                {/* <th key={idx} className={clsx('p-5 tracking-wider')}> */}
                <div
                  className={clsx('flex cursor-pointer items-center')}
                  onClick={() => setSortKeyAndOrder(thead.key)}
                >
                  {thead.label}
                  {thead.key === 'area' && (
                    <span className='ml-1'>
                      (km<sup>2</sup>)
                    </span>
                  )}
                  <span className='w-6'>
                    {sortKey === thead.key && (
                      <MdKeyboardArrowDown
                        className={clsx(
                          'h-6 w-6  text-textColor transition-transform duration-200',
                          sortOrder === 'desc' &&
                            sortKey === thead.key &&
                            'rotate-0',
                          sortOrder === 'asc' &&
                            sortKey === thead.key &&
                            'rotate-180'
                        )}
                      />
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {orderedCountries?.map((country: DataCountry) => (
            <tr
              key={country.numericCode}
              className='rounded-md bg-bgColorLight p-2 pb-16 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md'
            >
              <td className=' p-2 sm:p-5'>
                <div className='flex items-center space-x-2 sm:space-x-4'>
                  <Image
                    src={country.flag}
                    alt={country.alpha3Code}
                    width={40}
                    height={30}
                    objectFit='contain'
                  />{' '}
                  <UnstyledLink
                    href={`/country/${country.alpha3Code}`}
                    className='underline underline-offset-4 hover:text-textColorSec'
                  >
                    {country.name}
                  </UnstyledLink>{' '}
                </div>
              </td>
              <td className='p-2 sm:p-5'>{country.population} </td>
              <td className='hidden sm:table-cell sm:p-5'>
                {country.area || 'N/A'}{' '}
              </td>
              <td className='hidden sm:p-5 lg:table-cell'>
                {country.subregion}{' '}
              </td>
              <td className='hidden sm:p-5 md:table-cell'>{country.region} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const tableHead: { key: SortKeys; label: string }[] = [
  { key: 'name', label: 'Name' },
  { key: 'population', label: 'Population' },
  { key: 'area', label: 'Area' },
  { key: 'subregion', label: 'Subregion' },
  { key: 'region', label: 'Region' },
];

export default CountriesTable;
