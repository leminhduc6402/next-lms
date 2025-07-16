"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Course = {
  // id: string;
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  status: string;
  teacherId: {
    _id: string;
    name: string;
    email: string;
    image: string;
  };
  sectionId: {
    name: string;
    order: number;
    lessonId: {
      title: string;
      status: string;
      description: string;
      fileUrl: string;
      order: number;
    };
  };
};

export const columns: ColumnDef<Course>[] = [
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const convertedPrice = new Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "VND",
      }).format(row.original.price);
      // console.log(convertedPrice);
      return <div>{convertedPrice}</div>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    accessorKey: "teacherId",
    header: "Teacher",
    cell: ({ row }) => {
      const teacher = row.original.teacherId;
      return <div>{teacher.name}</div>;
    },
  },
  // {
  //   id: "actions",
  //   header: () => <div className="text-center">Actions</div>,
  //   cell: ({ row }) => {
  //     return <DataTableRowActions row={row} />;
  //   },
  // },
];
