import React, { useState } from "react";
import NavButton from "../components/NavButton";
import axios from "axios";

const Home: React.FC = () => {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get("http://localhost:3001/frase");
      setData(response.data);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p className="text-yellow-600">Welcome to the Home Page!</p>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <p>Data: {data}</p>}

      <button
        onClick={fetchData}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
      >
        Fetch Data
      </button>

      <NavButton to="/dashboard" label="Go to Dashboard Page" />
    </div>
  );
};

export default Home;
