"use client";
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
type Props = {
  data: any;
};

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#c7ccdb";
const PieChartWrapper = (props: Props) => {
  const data = {
    labels: props.data.map((el) => el.title),

    datasets: [
      {
        label: "Expenses",
        data: props.data.map((el) => el.value),
        backgroundColor: props.data.map((el) => el.color),
        borderColor: props.data.map((el) => "#1e1e1e"),
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  return <Pie data={data} className="justify-self-center" />;
};

export default PieChartWrapper;
