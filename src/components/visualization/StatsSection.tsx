/**
 * @fileoverview Key statistics visualization section
 */

import { memo } from "react";
import { analyzeAdherence } from "../../data/profileSchedules";
import type { Profile } from "../../types/profile";

interface StatsSectionProps {
  profile: Profile;
}

interface StatCardProps {
  title: string;
  value: string | number;
  bgColor: string;
  textColor: string;
}

const StatCard = memo(({ title, value, bgColor, textColor }: StatCardProps) => (
  <div className={`p-4 rounded-lg ${bgColor}`}>
    <h3 className={`text-sm font-medium ${textColor}`}>{title}</h3>
    <p className={`text-2xl font-bold ${textColor.replace("800", "900")}`}>
      {value}
    </p>
  </div>
));

StatCard.displayName = "StatCard";

const StatsSection = memo(({ profile }: StatsSectionProps) => {
  const adherenceStats = profile.schedules.length
    ? analyzeAdherence(profile.schedules)
    : null;

  if (!adherenceStats) {
    return null;
  }

  return (
    <section className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-semibold">Key Statistics</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Overall Adherence"
          value={`${adherenceStats.adherenceRate.toFixed(1)}%`}
          bgColor="bg-blue-50 dark:bg-blue-900/20"
          textColor="text-blue-800 dark:text-blue-200"
        />
        <StatCard
          title="Doses Taken"
          value={adherenceStats.taken}
          bgColor="bg-green-50 dark:bg-green-900/20"
          textColor="text-green-800 dark:text-green-200"
        />
        <StatCard
          title="Missed Doses"
          value={adherenceStats.missedDoses}
          bgColor="bg-red-50 dark:bg-red-900/20"
          textColor="text-red-800 dark:text-red-200"
        />
        <StatCard
          title="Active Cycles"
          value={profile.cycles.length}
          bgColor="bg-purple-50 dark:bg-purple-900/20"
          textColor="text-purple-800 dark:text-purple-200"
        />
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
