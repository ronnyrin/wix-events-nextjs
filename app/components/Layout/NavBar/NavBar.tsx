'use client';
import { NavLink } from './NavLink';
import { useState } from 'react';
import type { LinkProps } from 'next/link';
import LoginAvatar from '@app/components/Layout/NavBar/LoginAvatar';
import { usePathname } from 'next/navigation';

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
      isActive ? 'text-black' : 'hover:text-yellow-100'
    }`}
    {...linkProps}
  />
);

export function NavBar() {
  const pathname = usePathname();
  const [linkRef, setLinkRef] = useState<LinkProps['href']>(pathname);
  return (
    <nav>
      <ul className="flex flex-row gap-8 text-s justify-center text-[20px] leading-[22px]">
        {[
          { ref: '/#about', label: 'Home' },
          { ref: '/stores-products', label: 'Shop' },
          { ref: '/#experience', label: 'Experience' },
          { ref: '/#community', label: 'Community' },
          { ref: '/#contact', label: 'Contact' },
        ].map(({ ref, label }) => (
          <li key={ref}>
            <StyledNavLink
              isActive={ref === linkRef}
              href={ref}
              className="text-black"
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

        <li>
          <div className="">
            <a className="btn-main" href="/register-now">
              Register Now
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
}
