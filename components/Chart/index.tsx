import React, { useState, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import CardWrapper from "@/components/Cards/CardWrapper";
import DatePicker from "react-datepicker";
import "../../node_modules/react-datepicker/dist/react-datepicker.css";

interface CovidData {
  Date: string;
  "Total Confirmed Cases": number;
  "Total Deaths": number;
  "Total Recovered": number;
  "Active Cases": number;
  "Daily Confirmed Cases": number;
  "Daily  deaths": number;
}

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ChartPage: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [graphType, setGraphType] = useState<"bar" | "line" | "pie">("bar");
  const [selectedDatasets, setSelectedDatasets] = useState<string[]>([
    "Total Confirmed Cases",
    "Total Deaths",
    "Total Recovered",
    "Active Cases",
    "Daily Confirmed Cases",
    "Daily  deaths",
  ]);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false); // Track file upload status
  const router = useRouter();

  // Fetch data from the backend
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8020/api/data/all");
      setData(response.data);
      setIsFileUploaded(true); // Set file upload status to true
      console.log("Fetched data:", response.data); // Debugging log
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:8020/api/data/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("File uploaded successfully");
      fetchData(); // Refresh data after upload
    } catch (error) {
      console.error("Failed to upload file:", error);
      alert("Failed to upload file");
    }
  };

  // Ensure dates are unique and sorted
  const aggregatedData = data.reduce((acc, entry) => {
    const dateStr = new Date(entry.Date).toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  
    if (!acc[dateStr]) {
      // Initialize the entry for this date
      acc[dateStr] = {
        Date: dateStr,
        "Total Confirmed Cases": 0,
        "Total Deaths": 0,
        "Total Recovered": 0,
        "Active Cases": 0,
        "Daily Confirmed Cases": 0,
        "Daily  deaths": 0,
      };
    }
  
    // Sum up the values for each metric
    acc[dateStr]["Total Confirmed Cases"] += Number(entry["Total Confirmed Cases"]) || 0;
    acc[dateStr]["Total Deaths"] += Number(entry["Total Deaths"]) || 0;
    acc[dateStr]["Total Recovered"] += Number(entry["Total Recovered"]) || 0;
    acc[dateStr]["Active Cases"] += Number(entry["Active Cases"]) || 0;
    acc[dateStr]["Daily Confirmed Cases"] += Number(entry["Daily Confirmed Cases"]) || 0;
    acc[dateStr]["Daily  deaths"] += Number(entry["Daily  deaths"]) || 0;
  
    return acc;
  }, {});
  const aggregatedDataArray: CovidData[] = Object.values(aggregatedData);

  console.log("Aggregated Data:", aggregatedDataArray);


  // Filter data based on selected date range
  const filteredData = aggregatedDataArray.filter((entry: CovidData) => {
    const entryDate = new Date(entry.Date);
    return (
      (!startDate || entryDate >= startDate) &&
      (!endDate || entryDate <= endDate)
    );
  });
  
  console.log("Filtered Data:", filteredData);

  filteredData.sort((a: CovidData, b: CovidData) => new Date(a.Date).getTime() - new Date(b.Date).getTime());  // Prepare chart data for bar and line graphs
  
  const barLineChartData = {
    labels: filteredData.map((entry: CovidData) => entry.Date),
    datasets: [
      {
        label: "Total Confirmed Cases",
        data: selectedDatasets.includes("Total Confirmed Cases")
          ? filteredData.map((entry) => entry["Total Confirmed Cases"])
          : [],
        backgroundColor: "rgb(44, 13, 245)",
        borderColor: "rgb(44, 13, 245)",
        borderWidth: 1,
      },
      {
        label: "Total Deaths",
        data: selectedDatasets.includes("Total Deaths")
          ? filteredData.map((entry) => entry["Total Deaths"])
          : [],
        backgroundColor: "rgba(250, 22, 22, 1)",
        borderColor: "rgba(250, 22, 22, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Recovered",
        data: selectedDatasets.includes("Total Recovered")
          ? filteredData.map((entry) => entry["Total Recovered"])
          : [],
        backgroundColor: "rgb(41, 247, 26)", 
        borderColor: "rgb(41, 247, 26)",
        borderWidth: 1,
      },
      {
        label: "Active Cases",
        data: selectedDatasets.includes("Active Cases")
          ? filteredData.map((entry) => entry["Active Cases"])
          : [],
        backgroundColor: "rgb(188, 103, 17)", 
        borderColor: "rgb(188, 103, 17)",
        borderWidth: 1,
      },
      {
        label: "Daily Confirmed Cases",
        data: selectedDatasets.includes("Daily Confirmed Cases")
          ? filteredData.map((entry) => entry["Daily Confirmed Cases"])
          : [],
        backgroundColor:"rgb(240, 23, 237)", 
        borderColor: "rgb(240, 23, 237)",
        borderWidth: 1,
      },
      {
        label: "Daily deaths",
        data: selectedDatasets.includes("Daily  deaths")
          ? filteredData.map((entry) => entry["Daily  deaths"])
          : [],
        backgroundColor: "rgb(239, 242, 39)", 
        borderColor: "rgb(239, 242, 39)",
        borderWidth: 1,
      },
    ],
  }; 
  console.log("Filtered Data:", filteredData);
  console.log("Labels:", barLineChartData.labels);
  
  // Prepare chart data for pie chart
  const pieChartData = {
    labels: [
      "Total Confirmed Cases",
      "Total Deaths",
      "Total Recovered",
      "Active Cases",
      "Daily Confirmed Cases",
      "Daily  deaths",
    ],
    datasets: [
      {
        data: [
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Total Confirmed Cases"]) || 0),
            0
          ),
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Total Deaths"]) || 0),
            0
          ),
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Total Recovered"]) || 0),
            0
          ),
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Active Cases"]) || 0),
            0
          ),
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Daily Confirmed Cases"]) || 0),
            0
          ),
          filteredData.reduce(
            (sum, entry) => sum + (Number(entry["Daily  deaths"]) || 0),
            0
          ),
        ],
        backgroundColor: [
          "rgb(41, 247, 26)",
          "rgba(54, 162, 235, 1)",
          "rgb(44, 13, 245)",
          "rgb(240, 23, 237)",
          "rgb(188, 103, 17)",
          "rgba(250, 22, 22, 1)", 
        ],
        borderColor: [
          "rgb(41, 247, 26)",
          "rgba(54, 162, 235, 1)",
          "rgb(44, 13, 245)",
          "rgb(240, 23, 237)",
          "rgb(188, 103, 17)",
          "rgb(232, 21, 21)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Render the appropriate graph based on the selected type
  const renderGraph = () => {
    switch (graphType) {
      case "bar":
        return <Bar data={barLineChartData} />;
      case "line":
        return <Line data={barLineChartData} />;
      case "pie":
        return <Pie data={pieChartData} />;
      default:
        return <Bar data={barLineChartData} />;
    }
  };

  // Get available dates for the date picker
  const availableDates = data.map((entry) => new Date(entry.Date));

  return (
    <div className="container mx-auto px-8 mt-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <CardWrapper
          backgroudColor={"white"}
          borderRadius={"10px"}
          smPadding={"20px"}
          lgPadding={"30px"}
        >
          <h1 className="text-black text-lg font-large p-4">
            COVID-19 Data Visualization
          </h1>
          <div className="my-4 ml-4">
            <input
              type="file"
              accept=".json,.csv"
              onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              className="border p-2"
            />
            <button
              onClick={handleFileUpload}
              className="bg-primary text-white px-4 py-2 rounded ml-2"
            >
              Upload File
            </button>
          </div>

          {/* Show filters only if file is uploaded */}
          {isFileUploaded && (
            <>
              <div className="mt-8 mx-6 mb-4">
                <div className="flex space-x-4 mb-4">
                  <button
                    onClick={() => setGraphType("bar")}
                    className={`bg-primary text-white px-4 py-2 rounded ${
                      graphType === "bar" ? "bg-opacity-90" : "bg-opacity-50"
                    }`}
                  >
                    Bar Graph
                  </button>
                  <button
                    onClick={() => setGraphType("line")}
                    className={`bg-primary text-white px-4 py-2 rounded ${
                      graphType === "line" ? "bg-opacity-90" : "bg-opacity-50"
                    }`}
                  >
                    Line Graph
                  </button>
                  <button
                    onClick={() => setGraphType("pie")}
                    className={`bg-primary text-white px-4 py-2 rounded ${
                      graphType === "pie" ? "bg-opacity-90" : "bg-opacity-50"
                    }`}
                  >
                    Pie Chart
                  </button>
                </div>
                <div className="flex space-x-4 mb-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Total Confirmed Cases")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Total Confirmed Cases"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Total Confirmed Cases")
                          );
                        }
                      }}
                    />
                    <span>Total Confirmed Cases</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Total Deaths")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Total Deaths"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Total Deaths")
                          );
                        }
                      }}
                    />
                    <span>Total Deaths</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Total Recovered")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Total Recovered"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Total Recovered")
                          );
                        }
                      }}
                    />
                    <span>Total Recovered</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Active Cases")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Active Cases"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Active Cases")
                          );
                        }
                      }}
                    />
                    <span>Active Cases</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Daily Confirmed Cases")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Daily Confirmed Cases"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Daily Confirmed Cases")
                          );
                        }
                      }}
                    />
                    <span>Daily Confirmed Cases</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedDatasets.includes("Daily  deaths")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedDatasets([...selectedDatasets, "Daily  deaths"]);
                        } else {
                          setSelectedDatasets(
                            selectedDatasets.filter((dataset) => dataset !== "Daily  deaths")
                          );
                        }
                      }}
                    />
                    <span>Daily deaths</span>
                  </label>
                </div>
                <div className="flex space-x-4 mb-4">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date || undefined)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    placeholderText="Start Date"
                    includeDates={availableDates}
                    className="border p-2 rounded"
                  />
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date || undefined)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                    placeholderText="End Date"
                    includeDates={availableDates}
                    className="border p-2 rounded"
                  />
                </div>
                {renderGraph()}
              </div>
            </>
          )}
        </CardWrapper>
      </div>
      <button
        onClick={() => router.push("/")}
        className="bg-primary text-white px-4 py-2 rounded mt-4"
      >
        Go Back to Home
      </button>
    </div>
  );
};

export default ChartPage;