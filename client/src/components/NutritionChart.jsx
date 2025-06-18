import React, { useRef, useEffect } from "react";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function NutritionChart({ data }) {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Carbs", "Fat", "Protein"],
        datasets: [
          {
            label: "Nutrition Breakdown",
            data: [
              parseInt(data.carbs),
              parseInt(data.fat),
              parseInt(data.protein),
            ],
            backgroundColor: ["#60a5fa", "#facc15", "#34d399"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: "bottom",
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                return `${tooltipItem.label}: ${tooltipItem.raw}g`;
              },
            },
          },
        },
      },
    });

    return () => {
      chartRef.current?.destroy();
    };
  }, [data]);

  return (
    <div className="flex justify-center items-center min-w-96">
        <canvas ref={canvasRef} className="w-[200px] h-[200px]" />
    </div>
  );
}

export default NutritionChart;
