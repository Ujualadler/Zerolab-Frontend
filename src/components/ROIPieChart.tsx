"use client";
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ROIPieChart: React.FC = () => {
  const [series] = useState<number[]>([57, 43]); // Profit and Invested percentages
  const [options] = useState<ApexCharts.ApexOptions>({
    chart: {
      width: 380,
      type: 'pie',
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        startAngle: -180,
        endAngle: 180,
        offsetX: 0,
        offsetY: 0,
        dataLabels: {
          offset: 0,
        },
      },
    },
    colors: ['#80FF00', '#1F3635'],
    dataLabels: {
      enabled: true,
      formatter: function (val: number, opts: any) {
        const labels = ['Profit', 'Invested'];
        const labelText = labels[opts.seriesIndex];
        return `${labelText}\n${val.toFixed(2)}%`;
      },
      style: {
        colors: ['#fff'],
        fontSize: '14px',
        fontWeight: 'bold',
      },
      dropShadow: {
        enabled: false,
      },
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  });

  return (
    <div className="apex-chart-container">
      <div id="chart">
        <ReactApexChart options={options} series={series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ROIPieChart;
