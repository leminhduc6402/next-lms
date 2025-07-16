import { Row } from "@tanstack/react-table";
import { PencilLine, Trash2 } from "lucide-react";
import { useState } from "react";
import ModalEditUser from "./ModalEditUser";
import { Button } from "../ui/button";
import { User } from "@/app/dashboard/users/column";
import { ModalConfirm } from "../ModalConfirm";
import { toast } from "sonner";
import { handleDeleteUserAction } from "@/lib/api/users";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

function DataTableRowActions<TData extends User>({
  row,
}: DataTableRowActionsProps<TData>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const res = await handleDeleteUserAction(row.original._id);

      if (res.statusCode === 200) {
        toast.success("User deleted successfully");
      } else {
        toast.error("Delete failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Delete failed");
    } finally {
      setIsDeleteOpen(false);
    }
  };
  return (
    <div>
      <ModalConfirm
        open={isDeleteOpen}
        onCancel={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete user?"
        description="Are you sure you want to delete this user? This action cannot be undone."
        confirmText="Delete"
      />
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
