import React, { useEffect, useState } from "react";
import API from "../../services/api";

const IncomeSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    API.get("/income-summary")
      .then(res => setSummary(res.data.incomeSummary))
      .catch(err => console.error(err));
  }, []);

  if (!summary) return null;

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Income Summary</h2>
      <ul>
        <li>Direct Sponsor: ₹{summary.direct}</li>
        <li>Fighter Income: ₹{summary.fighter}</li>
        <li>Matching Income: ₹{summary.matching}</li>
      </ul>
    </div>
  );
};

export default IncomeSummary;
