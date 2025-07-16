import { auth } from "@/auth";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import CourseTableToolbar from "@/components/courses/CourseTableToolbar";
import { DataTable } from "@/components/DataTable";
import Header from "@/components/Header";
import { sendRequest } from "@/lib/api/api";
import { SearchParams } from "next/dist/server/request/search-params";
import React from "react";
import { columns, Course } from "./column";
const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Course", href: "/dashboard/courses" },
];

async function getCourses({
  page,
  pageSize,
  title,
}: SearchParams): Promise<IModelPaginate<Course>> {
  const session = await auth();

  const res = await sendRequest<IBackendRes<any>>({
    url: `${process.env.NEXT_PUBLIC_API_URL}/api/v1/courses`,
    method: "GET",
    queryParams: {
      current: Number(page) || 1,
      pageSize: Number(pageSize) || 10,
      title: `/${title}/i`,
      populate: "teacherId",
    },
    headers: { Authorization: `Bearer ${session?.user?.access_token}` },
    nextOption: { next: { tags: ["list-courses"] } },
  });
  // console.log(res.data)
  return (
    res.data ?? {
      results: [],
      meta: { current: 1, pageSize: 10, pages: 1, total: 0 },
    }
  );
}

async function ManageCoursePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { page = "1", pageSize = "10", title = "" } = await searchParams;

  const { results, meta } = await getCourses({ page, pageSize, title });
  return (
    <div className="h-full flex flex-col">
      <AppBreadcrumb items={breadcrumbItems} />
      <div className="flex-1 rounded-lg bg-white shadow p-4 dark:bg-slate-600">
        <Header title="Course Management" />
        <CourseTableToolbar />
        <DataTable columns={columns} data={results || []} meta={meta || null} />
      </div>
    </div>
  );
}

export default ManageCoursePage;
