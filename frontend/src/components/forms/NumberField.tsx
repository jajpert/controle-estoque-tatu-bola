import { Minus, Plus } from "@phosphor-icons/react";
import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";

interface NumberFieldRef {
  getValue: () => number;
}

interface NumberFieldProps {
  min?: number;
  max?: number;
}

const NumberField = forwardRef<NumberFieldRef, NumberFieldProps>(({ min, max }, ref) => {
  const [value, setValue] = useState(1);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  function handleClick(increment: boolean) {
    const newValue = increment ? value + 1 : value - 1;

    if ((min && newValue < min) || (max && newValue > max)) {
      return;
    }

    setValue(newValue);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "") {
      setValue(1);
      return;
    }

    const number = parseInt(event.target.value);

    if (isNaN(number)) {
      return;
    }

    if (min && number < min) {
      return;
    }

    if (max && number > max) {
      return;
    }

    setValue(number);
  }

  return (
    <div className="flex h-[30px] gap-2 overflow-hidden rounded-md border border-neutral-800 text-neutral-400">
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        className="w-full bg-transparent px-2 py-1 font-mono text-sm outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <div className="flex">
        <div
          onClick={() => handleClick(false)}
          className={`flex cursor-pointer items-center border-l border-neutral-800 px-2 ${value === min ? "cursor-auto" : "hover:bg-neutral-900"}`}
        >
          <Minus size={14} weight="regular" />
        </div>
        <div
          onClick={() => handleClick(true)}
          className={`flex cursor-pointer items-center border-l border-neutral-800 px-2 ${value === max ? "cursor-auto" : "hover:bg-neutral-900"}`}
        >
          <Plus size={14} weight="regular" />
        </div>
      </div>
    </div>
  );
});

export type { NumberFieldRef };
export default NumberField;
