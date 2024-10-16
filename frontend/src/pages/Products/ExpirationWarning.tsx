import { WarningCircle } from "@phosphor-icons/react";

interface ExpirationWarningProps {
  expired: boolean;
  singular: boolean;
}

const ExpirationWarning: React.FC<ExpirationWarningProps> = ({
  expired,
  singular,
}) => {
  const type = expired
    ? {
        style: "bg-red-950 text-red-500",
        label: singular
          ? "Este produto está vencido"
          : "Estes produtos estão vencidos",
      }
    : {
        style: "bg-yellow-950 text-yellow-500",
        label: singular
          ? "Este produto está prestes a vencer"
          : "Estes produtos estão prestes a vencer",
      };
  return (
    <span className={`${type.style} rounded-full p-0.5`} title={type.label}>
      <WarningCircle size={14} weight="bold" />
    </span>
  );
};

export default ExpirationWarning;
