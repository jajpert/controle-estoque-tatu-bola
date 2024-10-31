import { twMerge } from "tailwind-merge";
import { Icon, Smiley, SmileyMeh, SmileySad } from "@phosphor-icons/react";

type Status = "ideal" | "not_ideal" | "low";

interface StatusProps {
  icon: Icon;
  label: string;
  style: string;
}

const statusProps: Record<Status, StatusProps> = {
  ideal: {
    icon: Smiley,
    label: "Quantidade ideal",
    style: "bg-green-950 text-green-500",
  },
  not_ideal: {
    icon: SmileyMeh,
    label: "Quantidade não ideal",
    style: "bg-yellow-950 text-yellow-500",
  },
  low: {
    icon: SmileySad,
    label: "Quantidade baixa",
    style: "bg-red-950 text-red-500",
  },
};

interface StockStatusProps {
  status: Status;
  tooltip?: boolean;
}

function StockStatus({ status, tooltip = false }: StockStatusProps) {
  const { icon: Icon, label, style } = statusProps[status];

  return (
    <span
      className={twMerge("rounded-full p-0.5", style)}
      title={tooltip ? label : undefined}
    >
      <Icon size={14} weight="bold" />
    </span>
  );
}

export default StockStatus;

export type { Status };
