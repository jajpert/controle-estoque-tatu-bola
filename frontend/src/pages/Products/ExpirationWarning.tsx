import { twMerge } from "tailwind-merge";
import {
  CheckCircle,
  Icon,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react";

type Status = "good" | "about_to_expire" | "expired";

interface StatusProps {
  icon: Icon;
  label: {
    singular: string;
    plural: string;
  };
  style: string;
}

const statusProps: Record<Status, StatusProps> = {
  good: {
    icon: CheckCircle,
    label: {
      singular: "Este produto está dentro do prazo de validade",
      plural: "Estes produtos estão dentro do prazo de validade",
    },
    style: "bg-green-950 text-green-500",
  },
  about_to_expire: {
    icon: WarningCircle,
    label: {
      singular: "Este produto está prestes a vencer",
      plural: "Estes produtos estão prestes a vencer",
    },
    style: "bg-yellow-950 text-yellow-500",
  },
  expired: {
    icon: XCircle,
    label: {
      singular: "Este produto está vencido",
      plural: "Estes produtos estão vencidos",
    },
    style: "bg-red-950 text-red-500",
  },
};

interface ExpirationWarningProps {
  status: Status;
  singular: boolean;
}

function ExpirationWarning({ status, singular }: ExpirationWarningProps) {
  const { icon: Icon, label, style } = statusProps[status];

  return (
    <span
      className={twMerge("rounded-full p-0.5", style)}
      title={singular ? label.singular : label.plural}
    >
      <Icon size={14} weight="bold" />
    </span>
  );
}

export default ExpirationWarning;
