"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";

interface HeaderWithSearchProps {
  title: string;
  searchKey?: string;
  placeholder?: string;
  className?: string;
}

const HeaderWithSearch = ({
  title,
  searchKey = "name",
  placeholder = "Search...",
  className,
}: HeaderWithSearchProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(searchKey, value); // `/${value}/i`
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <Header
      title={title}
      rightSlot={
        <SearchInput
          placeholder={placeholder}
          delay={500}
          value={searchParams.get(searchKey) || ""}
          onChange={handleSearch}
          className={className || "max-w-sm"}
        />
      }
    />
  );
};

export default HeaderWithSearch;
