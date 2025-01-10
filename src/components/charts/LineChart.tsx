/**
 * @fileoverview Line chart component with interactive data points
 */

import { memo } from "react";
import type { ChartProps } from "../../types/visualization";

const LineChart = memo(
  ({ data, height = 200, color = "#2563eb" }: ChartProps) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    const width = 100 / (data.length - 1);

    const points = data
      .map((value, index) => {
        const x = index * width;
        const y = ((value - minValue) / range) * height;
        return `${x},${height - y}`;
      })
      .join(" ");

    return (
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full h-full"
        role="img"
        aria-label="Line chart visualization"
      >
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {data.map((value, index) => {
          const x = index * width;
          const y = height - ((value - minValue) / range) * height;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill={color}
              className="transition-all duration-200 hover:r-3"
              role="button"
              aria-label={`Data point ${index + 1}: ${value}`}
            />
          );
        })}
      </svg>
    );
  }
);

LineChart.displayName = "LineChart";

export default LineChart;
