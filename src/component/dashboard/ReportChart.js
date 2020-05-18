import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import { Pie } from 'react-chartjs-2';

import { postApi } from '../../utils/interceptors';
import { getChartLabels } from "../../utils";

let chartDetails = {};
const setLabel = (list) => {
  let labels = [];
  let count = [];
  Object.keys(list).map((key) => {
    labels.push(getChartLabels(key));
    count.push(list[key]);
  })
  chartDetails = {
    labels: labels,
    datasets: [
      {
        backgroundColor: [
          '#FF6004',
          '#36A2EB',
          '#FFCE56'
        ],
        data: count
      }
    ]
  };
}
function ReportChart() {
  useEffect(() => {
    postApi("api/campaign/campaignStatusTableListings")
      .then(res => setLabel(res.data.campaignListingsData))
      .catch((response) => response && toast.error(response.errorMessage));
  }, [])

  return (
    <div>
      <Pie
        data={chartDetails}
        options={{
          legend: {
            display: true,
            position: "bottom",
            align: "center",
            labels: {
              boxWidth: 10,
              padding: 20,
              fontSize: 14
            }
          }
        }}
      />
    </div>
  );
}

export default ReportChart