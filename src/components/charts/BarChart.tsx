/**
 * @fileoverview Bar chart component with interactive bars
 */

import { memo } from "react";
import type { ChartProps } from "../../types/visualization";

const BarChart = memo(
  ({ data, height = 200, color = "#2563eb" }: ChartProps) => {
    const maxValue = Math.max(...data);
    const barWidth = 100 / data.length;

    return (
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        role="img"
        aria-label="Bar chart visualization"
      >
        {data.map((value, index) => {
          const barHeight = (value / maxValue) * height;
          const x = index * barWidth;
          const y = height - barHeight;
          return (
            <rect
              key={index}
              x={x + barWidth * 0.1}
              y={y}
              width={barWidth * 0.8}
              height={barHeight}
              fill={color}
              className="transition-opacity duration-200 opacity-80 hover:opacity-100"
              role="button"
              aria-label={`Bar ${index + 1}: ${value}`}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  // Handle bar interaction if needed
                }
              }}
            />
          );
        })}
      </svg>
    );
  }
);

BarChart.displayName = "BarChart";

export default BarChart;
