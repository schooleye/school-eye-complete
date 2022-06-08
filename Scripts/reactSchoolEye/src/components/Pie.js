import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const PieChart = ({ chartData, pieTitle }) => {
  return (
    <Doughnut
      data={chartData}
      options={{
        responsive: true,
        radius: '50%',

        plugins: {
          legend: {
            labels: {
              font: {
                style: 'italic',
                weight: '600',
                size: 15,
              },
            },
          },
          title: {
            display: true,
            text: pieTitle,
            font: {
              size: 20,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },

          y: {
            grid: {
              display: false,
            },
          },
        },
      }}
    ></Doughnut>
  );
};

export default PieChart;
