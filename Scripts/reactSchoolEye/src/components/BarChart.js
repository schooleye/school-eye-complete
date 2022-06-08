import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ chartData, myLabels, pieTitle }) => {
  return (
    <Bar
      data={chartData}
      options={{
        responsive: true,
        layout: {
          // padding: 24,
          // margin: 25,
        },
        plugins: {
          title: {
            display: true,
            text: pieTitle,
            font: {
              size: 20,
            },
          },
          legend: {
            display: false,
            labels: {
              font: {
                style: 'italic',
                weight: '600',
                size: 15,
              },
            },
          },

          datalabels: {
            font: {
              weight: 'bold',
              size: 15,
            },
          },
        },
        scales: {
          yAxes: {
            beginAtZero: true,
            title: {
              display: true,
              text: myLabels.y || 'y label',
              font: {
                size: 20,
              },
            },
          },
          xAxes: {
            title: {
              display: true,
              text: myLabels.x || 'Y axis title',
              font: {
                size: 20,
              },
            },
            // size: 30,
          },
        },
      }}
    ></Bar>
  );
};

export default BarChart;
