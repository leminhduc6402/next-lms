import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface SearchInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  delay?: number;
  className?: string;
}

const SearchInput = ({
  placeholder = "Search...",
  value,
  onChange,
  delay = 300,
  className,
  ...props
}: SearchInputProps) => {
  const [searchTerm, setSearchTerm] = useState<string>(value);
  const debouncedValue = useDebounce(searchTerm, delay);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    onChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <div className={cn("relative", className)}>
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
        <Search size={16} />
      </span>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-9"
        {...props}
      />
    </div>
  );
};

export default SearchInput;
