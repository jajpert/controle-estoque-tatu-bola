import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";

const DECIMAL_PLACES = 2;

interface CurrencyFieldRef {
  getValue: () => number;
  getFormattedValue: () => string;
}

const CurrencyField = forwardRef<CurrencyFieldRef>(({}, ref) => {
  const [value, setValue] = useState<number>(0);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    getFormattedValue: () => formatValue(value),
  }));

  function formatValue(n: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(n)
      .replace("R$", "")
      .trim();
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value.replace(/[^\d,]/g, "").replace(",", "");
    const len = rawValue.length - DECIMAL_PLACES;
    const newValue = [rawValue.slice(0, len), rawValue.slice(len)].join(".");
    const numericValue = parseFloat(newValue) || 0;
    setValue(numericValue);
  }

  return (
    <div className="flex h-[30px] overflow-hidden rounded-md border border-neutral-800 text-neutral-400">
      <span className="flex items-center justify-center border-r border-neutral-800 px-2">R$</span>
      <input
        type="text"
        placeholder="0,00"
        value={formatValue(value)}
        onChange={handleInputChange}
        className="w-full bg-transparent px-2 py-1 font-mono text-sm outline-none placeholder:text-neutral-500"
      />
    </div>
  );
});

export type { CurrencyFieldRef };
export default CurrencyField;
