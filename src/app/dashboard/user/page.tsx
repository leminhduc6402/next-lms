import { auth } from "@/auth";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { sendRequest } from "@/lib/api";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "User", href: "/dashboard/user" },
];
interface IManageUserPageProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
const ManageUserPage = async () => {
  return (
    <div className="h-full flex flex-col">
      <AppBreadcrumb items={breadcrumbItems} />

      <div className="flex-1 rounded-lg bg-white shadow w-full p-4 dark:bg-slate-600">
        User management
      </div>
    </div>
  );
};

export default ManageUserPage;
