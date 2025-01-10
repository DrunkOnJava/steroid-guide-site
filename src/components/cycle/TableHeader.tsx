/**
 * @fileoverview Header component for the cycle table
 * @project     Steroid Guide Site (v0.0.0)
 * @module      TableHeader
 *
 * @author      Steroid Guide Team <team@steroidguide.com>
 * @created     2024-03-19
 * @modified    2024-03-19
 * @version     1.0.0
 *
 * @description
 * Reusable header component for the cycle table with tooltips for each column.
 * Provides clear visual hierarchy and accessibility features.
 */

import { TooltipWrapper } from "../ui";

export default function TableHeader() {
  return (
    <thead className="bg-gray-50 dark:bg-gray-900">
      <tr>
        <TooltipWrapper
          content="Duration of compound administration in weeks"
          position="top"
        >
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            Week
          </th>
        </TooltipWrapper>
        <TooltipWrapper
          content="Name of the compound being administered"
          position="top"
        >
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            Compound
          </th>
        </TooltipWrapper>
        <TooltipWrapper
          content="How often the compound should be administered"
          position="top"
        >
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            Frequency
          </th>
        </TooltipWrapper>
        <TooltipWrapper
          content="Amount of compound to be administered per dose"
          position="top"
        >
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            Dosage
          </th>
        </TooltipWrapper>
        <TooltipWrapper
          content="Intended effect of the compound in the cycle"
          position="top"
        >
          <th
            scope="col"
            className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400"
          >
            Purpose
          </th>
        </TooltipWrapper>
      </tr>
    </thead>
  );
}
