import { forwardRef, KeyboardEvent, MouseEvent, useImperativeHandle, useMemo, useRef, useState } from "react";
import { CaretDown, MagnifyingGlass } from "@phosphor-icons/react";

interface ComboBoxRef {
  getSelectedOption: () => ComboBoxOption | null;
}

interface ComboBoxOption {
  id: number;
  label: string;
}

interface ComboBoxProps {
  placeholder?: string;
  options: ComboBoxOption[];
}

const ComboBox = forwardRef<ComboBoxRef, ComboBoxProps>(({ placeholder, options }, ref) => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<ComboBoxOption | null>(null);

  useImperativeHandle(ref, () => ({
    getSelectedOption: () => selected,
  }));

  const wrapperRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    const parts = search.toLowerCase().trim().replace(/\s+/g, " ").split(" ");

    return options.filter((option) =>
      search.toLowerCase() === "" ? option : parts.every((part) => option.label.toLowerCase().includes(part)),
    );
  }, [search]);

  function handleOptionSelect(event: MouseEvent | KeyboardEvent, option: ComboBoxOption) {
    if ("key" in event && event.key !== "Enter" && event.key !== " ") {
      return;
    }

    if (event.target instanceof HTMLElement) {
      event.target.blur();
    }

    setSelected(option);

    if (wrapperRef.current) {
      wrapperRef.current.blur();
    }

    setSearch("");
  }

  function handleKeyboardEsc(event: KeyboardEvent) {
    if (event.key !== "Escape") {
      return;
    }

    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    event.stopPropagation();
    event.target.blur();
  }

  return (
    <div
      tabIndex={0}
      ref={wrapperRef}
      // onBlur={() => setSearch("")} // TODO: Reset search field after focus is lost
      onKeyDown={handleKeyboardEsc}
      className="group relative text-neutral-400 outline-none"
    >
      <div className="flex h-[30px] items-center justify-between overflow-hidden rounded-md border border-neutral-800 px-2 py-1">
        <span className={`${!selected && "text-neutral-500"}`}>{selected ? selected.label : placeholder}</span>
        <CaretDown size={12} weight="fill" />
      </div>
      <div className={`absolute z-50 hidden w-full group-focus-within:block`}>
        <div className="mt-2 w-full overflow-hidden rounded-md border border-neutral-800 bg-background">
          <div className="border-b border-neutral-800 p-1.5">
            <div className="flex items-center overflow-hidden rounded-md border border-neutral-800">
              <input
                type="text"
                value={search}
                placeholder="Pesquisar..."
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-1 pl-2 outline-none placeholder:text-neutral-500"
              />
              <div className="flex px-1">
                <MagnifyingGlass size={16} weight="regular" />
              </div>
            </div>
          </div>
          <ul className="flex max-h-32 flex-col overflow-y-auto">
            {filteredOptions.length === 0 && (
              <li className="p-2 text-neutral-500">Desculpe, nenhum resultado encontrado!</li>
            )}
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                tabIndex={0}
                onClick={(e) => handleOptionSelect(e, option)}
                onKeyDown={(e) => handleOptionSelect(e, option)}
                className={`cursor-pointer border-b border-neutral-800 p-2 outline-none last-of-type:border-none focus-within:bg-neutral-900 hover:bg-neutral-900 ${selected?.id === option.id ? "bg-neutral-900" : ""}`}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
});

export type { ComboBoxRef, ComboBoxOption };
export default ComboBox;
