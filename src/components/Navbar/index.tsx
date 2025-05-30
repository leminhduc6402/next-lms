import {
  BookOpen,
  GraduationCap,
  Home,
  LibraryBig,
  MessageCircleMore,
  ShoppingCart,
} from "lucide-react";
import Link from "next/link";
import { DarkModeToggle } from "../DarkModeToggle";
import NavLink from "../NavLink";
import UserProfile from "../UserProfile";

const Navbar = () => {
  return (
    <div className="w-full sticky shadow-md dark:bg-slate-700 z-50">
      <div className="flex justify-between items-center px-6 py-3">
        <div className="flex items-center">
          <div className="flex">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <h1 className="text-xl font-bold">LMS</h1>
            </Link>
          </div>
          <nav>
            <ul className="flex gap-8 ml-8">
              <li className="flex items-center gap-2">
                <NavLink href="/">
                  {" "}
                  <Home />
                  Home
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink href="/courses">
                  <LibraryBig />
                  Courses
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink href="/blog">
                  <BookOpen />
                  Blog
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <NavLink href="/contact">
                  <MessageCircleMore />
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
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
