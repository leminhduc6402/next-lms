// components/NavLink.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx"; // hoặc dùng tailwind trực tiếp

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 text-sm font-medium transition-colors",
        isActive ? "text-blue-600" : " hover:text-blue-500"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
