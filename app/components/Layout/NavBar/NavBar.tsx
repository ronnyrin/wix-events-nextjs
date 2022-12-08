'use client';
import { NavLink } from './NavLink';
import { useState } from 'react';
import { LinkProps } from 'next/link';
import LoginAvatar from '@app/components/Layout/NavBar/LoginAvatar';

const StyledNavLink = ({
  isActive,
  className,
  ...linkProps
}: LinkProps & {
  isActive: boolean;
  children: React.ReactNode;
  className?: string;
}) => (
  <NavLink
    className={`${className ?? ''} ${
      isActive ? 'text-turquoise-200' : 'hover:text-turquoise-200'
    }`}
    {...linkProps}
  />
);

export function NavBar() {
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(
    typeof window !== 'undefined'
      ? window?.location.pathname + window?.location.hash
      : ''
  );
  return (
    <nav>
      <ul className="flex flex-row gap-8 text-xs justify-end text-[15px] leading-[22px]">
        {[
          { ref: '/#about', label: 'About' },
          { ref: '/book-now', label: 'Services' },
          { ref: '/plans', label: 'Plans' },
          { ref: '/guides', label: 'Guides' },
          { ref: '/#contact', label: 'Contact' },
        ].map(({ ref, label }) => (
          <li key={ref}>
            <StyledNavLink
              isActive={ref === linkRef}
              href={ref}
              onClick={() => setLinkRef(ref)}
            >
              {label}
            </StyledNavLink>
          </li>
        ))}

        <li style={{ float: 'right' }}>
          <StyledNavLink href="/login" isActive={'/login' === linkRef}>
            <div className="flex text-turquoise-200 gap-2 justify-center items-center">
              <div>
                <LoginAvatar
                  width={22}
                  height={22}
                  className="fill-turquoise-200"
                />
              </div>
              <span>Log In</span>
            </div>
          </StyledNavLink>
        </li>
      </ul>
    </nav>
  );
}
