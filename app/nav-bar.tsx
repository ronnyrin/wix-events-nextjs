import styles from './nav-bar.module.css';
import { NavLink, NavLinkProps } from './nav-link';

const StyledNavLink = (props: NavLinkProps) => (
  <NavLink activeClassName={styles.active} {...props} />
);

export function NavBar() {
  return (
    <nav className={styles['top-nav']}>
      <ul>
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
