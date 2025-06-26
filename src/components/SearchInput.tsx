"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  delay?: number;
  initialValue?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  onSearch,
  delay = 300,
  initialValue = "",
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, delay);

  useEffect(() => {
    onSearch(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);
  useEffect(() => {
    if (initialValue !== searchTerm) {
      setSearchTerm(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  return (
    <div className="relative w-full max-w-sm">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <Search size={16} />
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9"
      />
    </div>
  );
};

export default SearchInput;
