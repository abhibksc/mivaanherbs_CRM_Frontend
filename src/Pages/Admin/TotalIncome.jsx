import React, { useEffect, useState } from "react";
import API from "../../services/api";

const TotalIncome = () => {
  const [income, setIncome] = useState(0);

  useEffect(() => {
    API.get("/total-income")
      .then(res => setIncome(res.data.totalIncome))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Total Income</h2>
      <p className="text-green-600 font-semibold text-lg">₹{income.toFixed(2)}</p>
    </div>
  );
};

export default TotalIncome;
