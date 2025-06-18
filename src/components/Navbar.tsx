import {
  BookOpen,
  GraduationCap,
  Home,
  LibraryBig,
  MessageCircleMore,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "./DarkkModeToggle";
import NavLink from "./NavLink";
import UserProfile from "./UserProfile";
import { SidebarTrigger } from "./ui/sidebar";

type NavbarProps = {
  isDashboard?: boolean;
  isEnabledSidebarTrigger?: boolean;
};
export const navLinks = [
  {
    href: "/",
    label: "Home",
    icon: <Home className="h-5 w-5" />,
  },
  {
    href: "/courses",
    label: "Courses",
    icon: <LibraryBig className="h-5 w-5" />,
  },
  {
    href: "/blog",
    label: "Blog",
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: <MessageCircleMore className="h-5 w-5" />,
  },
];
const Navbar = ({
  isDashboard = false,
  isEnabledSidebarTrigger = false,
}: NavbarProps) => {
  return (
    <div className="w-full sticky shadow-md dark:bg-slate-700 z-50">
      <div className="flex justify-between items-center px-4 py-3 bg-white dark:bg-slate-700">
        {isEnabledSidebarTrigger && <SidebarTrigger />}
        {!isDashboard && (
          <div className="flex items-center">
            <div className="flex">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6" />
                <h1 className="text-xl font-bold">LMS</h1>
              </Link>
            </div>
            <nav>
              <ul className="flex gap-8 ml-8">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
        <div className="flex items-center gap-4">
          <DarkModeToggle />
          <button>
            <ShoppingCart />
          </button>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
