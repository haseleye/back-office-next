import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register the components in ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ percents, isTotal }: any) => {
  // Data for the Pie chart
  const data = {
    datasets: [
      {
        data: percents, // Values for each category
        backgroundColor: isTotal
          ? ["#999900", "#990099", "#990000", "#009999"]
          : ["#2196F3", "#FFC107", "#4CAF50"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className=' '>
      <Pie width={"350px"} height={"350px"} data={data} />
    </div>
  );
};

export default PieChart;
