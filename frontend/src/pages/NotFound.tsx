import React from "react";
import NavButton from "../components/NavButton";

const NotFound: React.FC = () => {
  return (
    <div>
      <h1 className="text-red-600">404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>

      <NavButton to="/" label="Go to real Home Page" />
    </div>
  );
};

export default NotFound;
