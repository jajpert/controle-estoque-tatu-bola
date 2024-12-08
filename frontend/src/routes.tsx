import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import Occurrences from "./pages/Occurrences";
import Products from "./pages/Products";
import AddStock from "./pages/AddStock";
import RemoveStock from "./pages/RemoveStock";

import Navigation from "./components/Navigation";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Navigation />
      <div className="mt-5 p-5">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/stock-activity" element={<Occurrences />} />
          <Route path="/add-stock" element={<AddStock />} />
          <Route path="/remove-stock" element={<RemoveStock />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRoutes;
