"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import SearchInput from "../SearchInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ModalCreateCourse from "./CreateCourse";

const CourseTableToolbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // const [openCreate, setOpenCreate] = useState(false);

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("title", value); // `/${value}/i`
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
      <SearchInput
        placeholder="Search by title"
        delay={1000}
        value={searchParams.get("title") || ""}
        onChange={handleSearch}
      />

      <Button
        type="button"
        onClick={() => router.push("/dashboard/courses/create")}
        //() => setOpenCreate(true)
        className="self-end sm:self-auto"
      >
        <Plus className="w-4 h-4 mr-1" />
        Create Course
      </Button>
      {/* <ModalCreateCourse open={openCreate} onOpenChange={setOpenCreate} /> */}
    </div>
  );
};

export default CourseTableToolbar;
