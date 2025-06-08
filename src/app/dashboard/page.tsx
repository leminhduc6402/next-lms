import AppBreadcrumb from "@/components/AppBreadcrumb";
import React from "react";

const breadcrumbItems = [{ label: "Dashboard", href: "/dashboard" }];

const Home = () => {
  return (
    <>
      <AppBreadcrumb items={breadcrumbItems} />
      <div className="rounded-lg bg-white shadow w-full h-full p-2 dark:bg-slate-600">
        Home
      </div>
    </>
  );
};

export default Home;
