import AppBreadcrumb from "@/components/AppBreadcrumb";
import CreateCourse from "@/components/courses/CreateCourse";
import Header from "@/components/Header";
import React from "react";

const breadcrumbItems = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Course", href: "/dashboard/courses" },
  { label: "Create", href: "/dashboard/courses/create" },
];

const CreateCoursePage = () => {
  return (
    <div className="h-full flex flex-col">
      <AppBreadcrumb items={breadcrumbItems} />
      <div className="flex-1 rounded-lg h-full overflow-auto bg-white shadow p-4 dark:bg-slate-600">
        <Header title="Create new course" />
        <CreateCourse />
      </div>
    </div>
  );
};

export default CreateCoursePage;
