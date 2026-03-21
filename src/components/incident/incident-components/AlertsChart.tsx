import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { ChevronDown, Info, Loader2 } from "lucide-react";
import { Select } from "../../props/Select";
import Loader from "../../../shared/Loader";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

// Define filter options
const TIME_RANGE_OPTIONS = [
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
  { label: "Last 3 Months", value: "3months" },
  { label: "Last Year", value: "year" },
];

const AlertsChart: React.FC = () => {
  // 1. State for your API data
  const [chartData, setChartData] = useState<ChartData<"line"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // NEW: State for the selected filter
  const [selectedRange, setSelectedRange] = useState("7days");

  // 2. Simulate API Call - now depends on selectedRange
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Simulate a network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Simulate different data based on selected range
        const dataByRange = {
          "7days": {
            days: [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            inProgress: [12, 48, 28, 45, 30, 55, 32],
            resolved: [38, 18, 15, 62, 40, 25, 50],
          },
          "30days": {
            days: ["Week 1", "Week 2", "Week 3", "Week 4"],
            inProgress: [120, 180, 150, 200],
            resolved: [200, 150, 180, 220],
          },
          "3months": {
            days: ["Jan", "Feb", "Mar"],
            inProgress: [450, 520, 480],
            resolved: [500, 480, 600],
          },
          year: {
            days: ["Q1", "Q2", "Q3", "Q4"],
            inProgress: [1450, 1520, 1380, 1600],
            resolved: [1580, 1620, 1500, 1750],
          },
        };

        const apiResponse =
          dataByRange[selectedRange as keyof typeof dataByRange];

        setChartData({
          labels: apiResponse.days,
          datasets: [
            {
              label: "In Progress",
              data: apiResponse.inProgress,
              borderColor: "#B69374",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0,
              pointRadius: 0,
            },
            {
              label: "Resolved",
              data: apiResponse.resolved,
              borderColor: "#38A169",
              backgroundColor: "transparent",
              borderWidth: 3,
              tension: 0,
              pointRadius: 4,
              pointBackgroundColor: "#38A169",
              pointBorderColor: "#fff",
            },
          ],
        });
      } catch (error) {
        console.error("Failed to fetch chart data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedRange]); // Re-fetch when range changes

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        offset: true,
        border: {
          display: false,
        },
        grid: { color: "#ECE9F1" },

        ticks: {
          color: "#B69374",
          font: { size: 12, weight: "normal" },
          // labelOffset: 0,
          align: "end",
        },
      },
      y: {
        border: {
          display: false,
        },
        min: 0,
        // Dynamic max based on data range could be added here
        grid: { color: "#ECE9F1" },
        ticks: {
          color: "#B69374",
          stepSize: 25,
          callback: (value) => (value === 100 ? "100+" : value),
        },
      },
    },
  };

  return (
    <div className="w-full px-[30px] py-[27px] bg-surface shadow-card rounded-[18px] font-sans">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-text-secondary font-medium text-sm sm:text-base ">
          Open vs Resolved Alerts
        </h2>
        <div className="w-[142px]">
          <Select
            iconVariant="down1"
            options={TIME_RANGE_OPTIONS}
            value={selectedRange}
            onChange={setSelectedRange}
            placeholder="Select range"
          />
        </div>
      </div>

      <div className="h-[250px] w-full flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader />
            <p className="text-sm text-gray-400">Loading chart data...</p>
          </div>
        ) : (
          chartData && <Line options={options} data={chartData} />
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-6">
          <LegendItem color="#B69374" label="In Progress" />
          <LegendItem color="#38A169" label="Resolved" />
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
          <Info size={14} className="text-blue-400" />
          <span className="text-[11px]">
            Monitor backlog trends and AI response capacity.
          </span>
        </div>
      </div>
    </div>
  );
};

// Simple sub-component for the legend
const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div
      className={`w-[89px] h-[7px] rounded-lg`}
      style={{ backgroundColor: color }}
    ></div>
    <span className="text-xs text-text-secondary">{label}</span>
  </div>
);

export default AlertsChart;
