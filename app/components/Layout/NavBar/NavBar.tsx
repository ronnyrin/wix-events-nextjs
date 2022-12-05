import { NavLink, NavLinkProps } from './NavLink';

const StyledNavLink = (props: NavLinkProps) => (
  <NavLink activeClassName={''} {...props} />
);

export function NavBar() {
  return (
    <nav>
      <ul className="flex flex-row gap-8 text-xs justify-end">
        <li>
          <StyledNavLink href="/">Home</StyledNavLink>
        </li>
        <li>
          <StyledNavLink href="/#about">About</StyledNavLink>
        </li>
        <li>
          <StyledNavLink href="/#instructors">Instructors</StyledNavLink>
        </li>
        <li>
          <StyledNavLink href="/pricing">Plans & Pricing</StyledNavLink>
        </li>
        <li>
          <StyledNavLink href="/book-now">Book Now</StyledNavLink>
        </li>
        <li style={{ float: 'right' }}>
          <StyledNavLink href="/login">Login</StyledNavLink>
        </li>
      </ul>
    </nav>
  );
}
