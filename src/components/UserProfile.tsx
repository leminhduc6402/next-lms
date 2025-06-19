"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

type UserProfileProps = {
  session: any;
};

const UserProfile = ({ session }: UserProfileProps) => {
  return (
    <div>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src={session.user.image || ""} alt="user" />
              <AvatarFallback>
                {session.user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={session.user.image || ""} alt="user" />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{session.user.name}</p>
                  <span className="text-xs text-muted-foreground">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/account" className="w-full">
                My Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/cart" className="w-full">
                My Cart
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/courses" className="w-full">
                My Courses
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Button
                variant={"destructive"}
                className="w-full cursor-pointer"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href="/signin">Login</Link>
      )}
    </div>
  );
};

export default UserProfile;
