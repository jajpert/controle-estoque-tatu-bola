import { Warning } from "@phosphor-icons/react";
import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="mt-32 flex flex-col items-center justify-center gap-4">
      <div className="flex flex-col items-center text-red-500">
        <Warning size={32} weight="bold" />
        <h1 className="font-bold">Erro 404</h1>
      </div>
      <p className="text-xs">A página que você procura não existe!</p>
    </div>
  );
};

export default NotFound;
