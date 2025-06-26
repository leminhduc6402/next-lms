import { auth } from "@/auth";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { sendRequest } from "@/lib/api";
import { columns, User } from "./columns";
import { DataTable } from "./data-table";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "User", href: "/dashboard/user" },
];

async function getUsers(): Promise<User[]> {
  const session = await auth();
  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
    method: "GET",
    queryParams: {
      current: 1,
      pageSize: 10,
    },
    headers: {
      Authorization: `Bearer ${session?.user?.access_token}`,
    },
    nextOption: {
      next: { tags: ["list-users"] },
    },
  });
  return res.data.results;
}
const ManageUserPage = async () => {
  const data = await getUsers();
  return (
    <div className="h-full flex flex-col">
      <AppBreadcrumb items={breadcrumbItems} />

      <div className="flex-1 rounded-lg bg-white shadow w-full p-4 dark:bg-slate-600">
        {/* <Header title="User Management"/> */}
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ManageUserPage;
