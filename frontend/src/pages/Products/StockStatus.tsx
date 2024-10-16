import React from "react";
import {
  Icon,
  IconContext,
  Smiley,
  SmileyMeh,
  SmileySad,
} from "@phosphor-icons/react";

interface StockStatusProps {
  status: "ideal" | "not-ideal" | "low";
  show_tooltip?: boolean;
}

const StockStatus: React.FC<StockStatusProps> = ({
  status,
  show_tooltip = false,
}) => {
  var badge: { icon: Icon; label: string; style: string };

  switch (status) {
    case "ideal":
      badge = {
        icon: Smiley,
        label: "Quantidade ideal",
        style: "text-green-500 bg-green-950",
      };
      break;
    case "not-ideal":
      badge = {
        icon: SmileyMeh,
        label: "Quantidade não ideal",
        style: "text-yellow-500 bg-yellow-950",
      };
      break;
    case "low":
      badge = {
        icon: SmileySad,
        label: "Quantidade baixa",
        style: "text-red-500 bg-red-950",
      };
      break;
  }

  return (
    <span
      className={`${badge.style} rounded-full p-0.5`}
      title={show_tooltip ? badge.label : undefined}
    >
      <IconContext.Provider
        value={{
          size: 14,
          weight: "bold",
        }}
      >
        {React.createElement(badge.icon)}
      </IconContext.Provider>
    </span>
  );
};

export default StockStatus;
