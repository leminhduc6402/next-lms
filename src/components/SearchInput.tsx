import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/lib/hooks/useDebounce";

interface SearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  delay?: number;
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
    if (value !== searchTerm) setSearchTerm(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    const syntheticEvent = {
      target: { value: debouncedValue },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
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
