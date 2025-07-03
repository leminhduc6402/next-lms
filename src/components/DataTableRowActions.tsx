import { Row } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";
import { Button } from "./ui/button";
import { User } from "@/app/dashboard/users/columns";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions<TData extends User>({ row }: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // const user = row.original;
  return (
    <div>
      <ModalEditUser
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        title="Edit User"
        user={row.original}
      />
      <div className="flex justify-between items-center">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsEditOpen(true)}
        >
          <PencilLine className="text-blue-500" />
        </Button>
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setIsDeleteOpen(true)}
        >
          <Trash2 className="text-red-500" />
        </Button>
      </div>
    </div>
  );
}

export default DataTableRowActions;
