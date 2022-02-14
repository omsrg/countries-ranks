import clsx from 'clsx';

import UnstyledLink, { UnstyledLinkProps } from './UnstyledLink';

export default function CustomLink({
  children,
  className = '',
  ...rest
}: UnstyledLinkProps) {
  return (
    <UnstyledLink
      {...rest}
      className={clsx(
        'animated-underline custom-link inline-flex items-center font-medium',
        'focus-visible:ring-primary-300 focus:outline-none focus-visible:ring',
        'border-b border-dotted border-dark hover:border-black/0',
        className
      )}
    >
      <span className='dark:from-primary-300 dark:to-primary-400 dark:bg-gradient-to-tr dark:bg-clip-text dark:text-transparent'>
        {children}
      </span>
    </UnstyledLink>
  );
}
