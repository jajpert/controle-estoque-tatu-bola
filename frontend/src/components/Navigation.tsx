import React from "react";

import { useLocation, useNavigate } from "react-router-dom";
import {
  Icon,
  IconContext,
  Package,
  Plus,
  WarningOctagon,
  X,
} from "@phosphor-icons/react";

import Logo from "../assets/logo.svg";

interface ButtonProps {
  href: string;
  icon: Icon;
  label: React.JSX.Element;
  style: string;
}

const buttons: ButtonProps[] = [
  {
    href: "/",
    icon: Package,
    label: (
      <>
        Lista de
        <br />
        Produtos
      </>
    ),
    style: "text-sky-600 bg-sky-950 border-sky-600",
  },
  {
    href: "/ocorrencias",
    icon: WarningOctagon,
    label: (
      <>
        Lista de
        <br />
        Ocorrências
      </>
    ),
    style: "text-yellow-500 bg-yellow-950 border-yellow-500",
  },
  {
    href: "/registrar-entrada",
    icon: Plus,
    label: (
      <>
        Registrar
        <br />
        Entrada
      </>
    ),
    style: "text-green-600 bg-green-950 border-green-600",
  },
  {
    href: "/registrar-saida",
    icon: X,
    label: (
      <>
        Registrar
        <br />
        Saída
      </>
    ),
    style: "text-red-500 bg-red-950 border-red-500",
  },
];

const Button: React.FC<ButtonProps> = ({
  href,
  icon,
  label,
  style = "text-zinc-600 bg-zinc-950 border-zinc-600",
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  return (
    <button onClick={() => navigate(href)} className="flex items-center gap-2">
      <div
        className={`${style} relative flex h-8 w-8 items-center justify-center rounded-md border-2`}
      >
        <IconContext.Provider
          value={{
            size: 16,
            weight: "bold",
          }}
        >
          {React.createElement(icon)}
        </IconContext.Provider>
        <span
          className={`absolute -bottom-3 h-1 w-1 rounded-full transition-colors ${
            location.pathname === href ? "bg-white" : "bg-transparent"
          }`}
        ></span>
      </div>
      <span className="text-left font-medium leading-tight">{label}</span>
    </button>
  );
};

const Navigation: React.FC = () => {
  return (
    <header className="select-none bg-zinc-950 p-5 text-xs text-white">
      <div className="flex flex-row items-center justify-between gap-8">
        <div className="flex h-14 shrink-0 items-center">
          <img src={Logo} alt="" className="h-full" />
        </div>
        <div className="grid shrink-0 grid-cols-4 gap-8">
          {buttons.map((button, index) => {
            return (
              <Button
                key={index}
                href={button.href}
                icon={button.icon}
                label={button.label}
                style={button.style}
              />
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
