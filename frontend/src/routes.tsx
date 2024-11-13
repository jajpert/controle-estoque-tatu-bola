import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Occurrences from "./pages/Occurrences";
import Products from "./pages/Products";
import AddStock from "./pages/AddStock";

import Navigation from "./components/Navigation";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <div className="mt-5 p-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/ocorrencias" element={<Occurrences />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
