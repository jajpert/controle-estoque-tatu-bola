import React from "react";
import NavButton from "../components/NavButton";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the Dashboard Page.</p>

      <NavButton to="/home" label="Go to Home Page" />
    </div>
  );
};

export default Dashboard;
