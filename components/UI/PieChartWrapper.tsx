"use client";
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Chart } from "chart.js";
import { Pie } from "react-chartjs-2";
import "chart.piecelabel.js";
import "chart.piecelabel.js";

type Props = {
  data: any;
};

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.defaults.color = "#c7ccdb";

const PieChartWrapper = (props: Props) => {
  const data = props.data.map((el) => el.value);
  const colors = props.data.map((el) => el.color);

  const opts = {
    animation: {
      duration: 1000,
      easing: "easeOutQuart",
    },
    offset: 50,
  };
  const dataChart = {
    labels: props.data.map((el) => el.title),
    datasets: [
      {
        label: "Expenses",
        data: data,
        backgroundColor: colors,
        borderColor: props.data.map((el) => "#1e1e1e"),
        borderWidth: 1,
      },
    ],
  };
  return (
    <Pie
      data={dataChart}
      className="justify-self-center"
      options={{
        offset: 30,
        animation: {
          duration: 1000,
          onComplete: function () {
            console.log(this);
          },
        },
      }}
      id={"piepie"}
    />
  );
};

export default PieChartWrapper;
