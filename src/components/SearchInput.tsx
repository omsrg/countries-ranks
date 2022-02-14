import { MdSearch } from 'react-icons/md';

const SearchInput = ({ ...rest }) => {
  return (
    <div className='relative flex w-full items-center'>
      <MdSearch className='absolute left-2 h-8 w-8 text-textColorSec' />
      <input
        type='text'
        className='h-full w-full rounded-md border-none bg-bgColorDark p-2 pl-10 placeholder:text-sm placeholder:text-textColorSec focus:ring-textColorSec sm:placeholder:text-base md:p-3 md:pl-10'
        {...rest}
      />
    </div>
  );
};

export default SearchInput;
