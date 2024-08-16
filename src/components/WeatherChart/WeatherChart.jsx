/* eslint-disable react/prop-types */
import classes from "./WeatherChart.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
const WeatherChart = ({ data }) => {
  const xAxisData = data.map((point) => point.x);
  const yAxisData = data.map((point) => point.y);

  const chartData = {
    labels: xAxisData,
    datasets: [
      {
        data: yAxisData,
        backgroundColor: "transparent",
        borderColor: "#f26c6d",
        pointBorderColor: "red",
        pointBorderWidth: 4,
        tension: 0,
      },
    ],
  };

  return (
    <div className={classes.weatherChartWrapper}>
      <Line data={chartData}></Line>
    </div>
  );
};

export default WeatherChart;
