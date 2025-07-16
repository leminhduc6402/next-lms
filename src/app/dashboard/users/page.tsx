import { auth } from "@/auth";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import Header from "@/components/Header";
import UserTableToolbar from "@/components/users/UserTableToolbar";
import { sendRequest } from "@/lib/api/api";
import { DataTable } from "../../../components/DataTable";
import { columns, User } from "./column";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "User", href: "/dashboard/users" },
];

type SearchParams = {
  page?: string;
  pageSize?: string;
  name?: string;
};

async function getUsers({
  page,
  pageSize,
  name,
}: SearchParams): Promise<IModelPaginate<User>> {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/users`,
    method: "GET",
    queryParams: {
      current: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      name: `/${name}/i`,
    },
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    nextOption: { next: { tags: ["list-users"] } },
  });
  return (
    res.data ?? {
      results: [],
      meta: { current: 1, pageSize: 10, pages: 1, total: 0 },
    }
  );
}

export default async function ManageUserPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page = "1", pageSize = "10", name = "" } = await searchParams;

  const { results, meta } = await getUsers({ page, pageSize, name });

  return (
    <div className="h-full flex flex-col">
      <AppBreadcrumb items={breadcrumbItems} />
      <div className="flex-1 rounded-lg bg-white shadow p-4 dark:bg-slate-600">
        <Header title="User Management" />
        <UserTableToolbar />
        <DataTable columns={columns} data={results || []} meta={meta || null} />
      </div>
    </div>
  );
}
