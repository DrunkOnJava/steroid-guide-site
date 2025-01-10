/**
 * @fileoverview Legend component for cycle table showing compound types
 */

import { memo } from "react";
import { TooltipWrapper } from "../ui";
import { legendItems } from "../../data/cycleTableData";
import type { LegendItem } from "../../types/cycle";

const LegendItem = memo(({ item }: { item: LegendItem }) => (
  <TooltipWrapper content={item.tooltip} position="top">
    <div className="flex items-center">
      <div className={`w-3 h-3 mr-2 rounded-full ${item.color}`} />
      <span>{item.label}</span>
    </div>
  </TooltipWrapper>
));

LegendItem.displayName = "LegendItem";

const TableLegend = memo(() => (
  <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-300">
    {legendItems.map((item) => (
      <LegendItem key={item.type} item={item} />
    ))}
  </div>
));

TableLegend.displayName = "TableLegend";

export default TableLegend;
