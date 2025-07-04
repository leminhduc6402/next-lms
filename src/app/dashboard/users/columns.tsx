"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX } from "lucide-react";

import DataTableRowActions from "@/components/DataTableRowActions";

export type User = {
  id: string;
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  isActive: boolean;
  accountType: "LOCAL" | "GOOGLE" | "GITHUB";
};

export const columns: ColumnDef<User>[] = [
  {
    id: "stt",
    header: () => <div className="text-center">#</div>,
    cell: ({ row, table }) => {
      const index =
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize +
        row.index +
        1;
      return <div className="text-center">{index}</div>;
    },
    size: 50,
  },
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
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      return <DataTableRowActions row={row} />;
    },
  },
];
