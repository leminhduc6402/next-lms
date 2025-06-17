"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
let UserProfileCounter = 0;
const UserProfile = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  console.log("UserProfile", UserProfileCounter++);
  return (
    <div>
      {status === "authenticated" && session?.user ? (
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
                className="w-full"
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
