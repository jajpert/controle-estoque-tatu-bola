import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";

interface DateFieldRef {
  getDate: () => Date | null;
}

const DateField = forwardRef<DateFieldRef>(({}, ref) => {
  const [date, setDate] = useState<Date | null>(null);

  useImperativeHandle(ref, () => ({
    getDate: () => date,
  }));

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const newDate = new Date(event.target.value);
    setDate(newDate);
  }

  function getStringDate(date: Date) {
    return date.toISOString().substring(0, 10);
  }

  return (
    <input
      type="date"
      value={date ? getStringDate(date) : ""}
      onChange={handleInputChange}
      className="h-[30px] rounded-md border border-neutral-800 bg-transparent px-2 py-1 font-mono text-sm text-neutral-400 outline-none placeholder:text-neutral-500"
    />
  );
});

export type { DateFieldRef };
export default DateField;
