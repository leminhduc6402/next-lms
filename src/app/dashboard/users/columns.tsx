"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type User = {
  id: string;
  name: number;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  accountType: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    // header: "Email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "isActive",
    header: () => <div className="text-center">Active</div>,
    cell: ({ row }) => {
      const isActive = row.getValue("isActive");

      return (
        <div className="flex justify-center">
          {isActive ? (
            <CircleCheck className="text-green-500" />
          ) : (
            <CircleX className="text-red-500" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "accountType",
    header: "Account Type",
  },
  {
    id: "actions",
    cell: () => {
      // const user = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-blue-500">Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
