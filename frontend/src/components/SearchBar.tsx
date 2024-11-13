import { MagnifyingGlass } from "@phosphor-icons/react";

interface SearchBarProps {
  placeholder: string;
  onSearch: (search: string) => void;
}

function SearchBar({ placeholder, onSearch }: SearchBarProps) {
  return (
    <div className="relative flex rounded-md border border-neutral-800 text-xs">
      <input
        type="text"
        className="w-96 bg-transparent py-1 pl-2 pr-7 text-neutral-400 outline-none placeholder:text-neutral-500"
        placeholder={placeholder}
        onChange={(e) => onSearch(e.target.value)}
      />
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 px-2 text-neutral-400 transition-colors">
        <MagnifyingGlass size={14} weight="bold" />
      </span>
    </div>
  );
}

export default SearchBar;
