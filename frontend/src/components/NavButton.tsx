// src/components/NavButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

interface NavButtonProps {
  to: string; // Rota para a qual o botão irá navegar
  label: string; // Texto a ser exibido no botão
}

const NavButton: React.FC<NavButtonProps> = ({ to, label }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {label}
    </button>
  );
};

export default NavButton;
