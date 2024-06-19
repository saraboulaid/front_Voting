import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto"; // Import Chart.js

export default function PieChart({ options }) {
  const [yValues, setYValues] = useState([]);
  const [selectedOptionCount, setSelectedOptionCount] = useState(null);

  useEffect(() => {
    // Function to fetch counts for all options asynchronously
    const fetchCounts = async () => {
      try {
        const counts = await Promise.all(
          options.map(async (option) => {
            return await option.getCount();
          })
        );
        setYValues(counts);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, [options]);

  useEffect(() => {
    // Chart configuration
    const barColors = generateBarColors(options.length);

    const chartConfig = {
      type: "doughnut",
      data: {
        labels: options.map((option) => option.option),
        datasets: [{ backgroundColor: barColors, data: yValues }],
      },
      options: {
        plugins: {
          legend: {
            labels: {
              color: "#4a044e", // Change la couleur du texte en blanc
            },
          },
        },

        onClick: (event, chartElement) => {
          if (chartElement.length > 0) {
            const index = chartElement[0].index;
            setSelectedOptionCount(yValues[index]);
          }
        },
      },
    };

    // Get canvas element
    const ctx = document.getElementById("myChart");

    // Create new Chart.js instance
    const myChart = new Chart(ctx, chartConfig);

    // Clean up function
    return () => {
      myChart.destroy(); // Destroy the chart instance when component unmounts
    };
  }, [options, yValues]);

  // Function to generate an array of fixed colors based on the number of options
  const generateBarColors = (numColors) => {
    const fixedColors = ["#4a044e", "#fecdd3", "#a21caf", "#db2777", "#9333ea"];
    return fixedColors.slice(0, numColors); // Return only the required number of colors
  };

  return (
    <div className="flex justify-center">
      <canvas
        id="myChart"
        style={{ width: "100%", height: "auto", margin: "auto" }}
      ></canvas>
      {selectedOptionCount !== null && (
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          Selected Option Count: {selectedOptionCount}
        </div>
      )}
    </div>
  );
}
