import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import Products from "./pages/Products";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <div className="my-5 p-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
