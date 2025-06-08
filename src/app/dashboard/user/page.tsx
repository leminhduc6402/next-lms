import AppBreadcrumb from "@/components/AppBreadcrumb";
import React from "react";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "User", href: "/dashboard/user" },
];

const ManageUser = () => {
  return (
    <>
      <AppBreadcrumb items={breadcrumbItems} />

      <div className="rounded-lg bg-white shadow w-full h-full p-2 dark:bg-slate-600">
        ManageUser
      </div>
    </>
  );
};

export default ManageUser;
