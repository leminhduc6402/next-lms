"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-2 text-sm font-medium transition-colors",
        isActive
          ? "text-blue-600"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
      )}
      title={label}
      aria-label={label}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default NavLink;
