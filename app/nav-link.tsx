'use client';

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

export type NavLinkProps = LinkProps & {
  activeClassName?: string;
  children: React.ReactNode;
};

export function NavLink(
  props: NavLinkProps
) {
  const pathname = usePathname();
  const {activeClassName, children, ...linkProps} = props;

  return (
    <Link
      {...linkProps}
      className={pathname === props.href ? props.activeClassName : ""}
    >
      {props.children}
    </Link>
  );
}
