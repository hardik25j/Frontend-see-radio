import React, { useEffect } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { toast } from 'react-toastify';

import { postApi } from '../../utils/interceptors';
import { getStatus } from '../../utils';

let chartDetails = {};
const setLabel = (statusList) => {
  let labels = [];
  let count = [];
  statusList.map((item) => {
    labels.push(getStatus(item.statusID));
    count.push(item.count);
  })

  chartDetails = {
    labels: labels,
    datasets: [
      {
        backgroundColor: '#36A2EB',
        borderWidth: 1,
        data: count
      }
    ]
  };
}

function StatusChart() {
  useEffect(() => {
    postApi("api/campaign/campaignStatusTableListings")
      .then(res => setLabel(res.data.campaignStatusTable))
      .catch((response) => response && toast.error(response.errorMessage));
  }, [])

  return (
    <div>
      <HorizontalBar
        data={chartDetails}
        height={300}
        options={{
          responsive: true,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            xAxes: [{
              gridLines: {
                display: false,
              },
              ticks: {
                callback(value, index) {
                  if (index % 2 == 1) return '';
                  return value;
                },
                min: 0,
                max: 10,
                fontSize: 14,
                fontStyle: { bold: true }
              }
            }],
            yAxes: [{
              gridLines: {
                display: false
              },
              ticks: {
                fontSize: 16,
                fontStyle: { bold: true }
              }
            }]
          },
          legend: {
            display: false,
          }
        }}
      />
    </div>
  );
};
export default StatusChart;