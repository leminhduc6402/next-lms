import AppBreadcrumb from "@/components/AppBreadcrumb";
import React from "react";
const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Course", href: "/dashboard/courses" },
];

const ManageCourse = () => {
  return (
    <>
      <AppBreadcrumb items={breadcrumbItems} />
      <div className="rounded-lg bg-white shadow w-full h-[100%] p-2 dark:bg-slate-600">
        ManageCourse
      </div>
    </>
  );
};

export default ManageCourse;
