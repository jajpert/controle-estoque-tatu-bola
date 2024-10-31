import { ArrowDown, ArrowUp, Icon } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";

type OccurrenceType = "in" | "out";

const styles: Record<OccurrenceType, { icon: Icon; style: string }> = {
  in: {
    icon: ArrowUp,
    style: "bg-green-950 text-green-500 group-hover:border-green-700",
  },
  out: {
    icon: ArrowDown,
    style: "bg-red-950 text-red-500 group-hover:border-red-700",
  },
};

interface OccurrenceTypeProps {
  type: OccurrenceType;
}

function OccurrenceType({ type }: OccurrenceTypeProps) {
  const { icon: Icon, style } = type === "in" ? styles.in : styles.out;

  return (
    <span
      className={twMerge(
        "flex h-3.5 w-3.5 items-center justify-center rounded-sm border border-transparent",
        style,
      )}
    >
      <Icon size={12} weight="bold" />
    </span>
  );
}

export default OccurrenceType;
