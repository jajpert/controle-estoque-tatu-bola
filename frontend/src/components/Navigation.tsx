import { useLocation, useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Icon, Package, Plus, WarningCircle, X } from "@phosphor-icons/react";

import Logo from "../assets/logo.svg";

const buttons: NavigationButtonProps[] = [
  {
    icon: Package,
    label: "Lista de\nProdutos",
    style: "text-sky-500 bg-sky-950 border-sky-500",
    href: "/",
  },
  {
    icon: WarningCircle,
    label: "Lista de\nOcorrências",
    style: "text-yellow-500 bg-yellow-950 border-yellow-500",
    href: "/stock-activity",
  },
  {
    icon: Plus,
    label: "Registrar\nEntrada",
    style: "text-green-500 bg-green-950 border-green-500",
    href: "/add-stock",
  },
  {
    icon: X,
    label: "Registrar\nSaída",
    style: "text-red-500 bg-red-950 border-red-500",
    href: "/remove-stock",
  },
];

interface NavigationButtonProps {
  icon: Icon;
  label: string;
  style: string;
  href: string;
}

function NavigationButton({ icon: Icon, label, style, href }: NavigationButtonProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <button onClick={() => navigate(href)} className="flex items-center gap-2 outline-none">
      <div className={twMerge("relative flex h-8 w-8 items-center justify-center rounded-md border-2", style)}>
        <Icon size={16} weight="bold" />
        <span
          className={`absolute -bottom-3 h-1 w-1 rounded-full transition-colors ${
            location.pathname === href ? "bg-white" : "bg-transparent"
          }`}
        />
      </div>
      <span className="whitespace-pre-line text-left font-medium leading-tight">{label}</span>
    </button>
  );
}

function Navigation() {
  return (
    <header className="p-5 text-xs text-white">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex h-14 shrink-0 items-center">
          <img src={Logo} alt="" className="h-full" />
        </div>
        <div className="grid shrink-0 grid-cols-4 gap-8">
          {buttons.map((button, index) => (
            <NavigationButton
              key={index}
              icon={button.icon}
              label={button.label}
              style={button.style}
              href={button.href}
            />
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navigation;
