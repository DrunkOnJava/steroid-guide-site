[object Promise]export interface Stat {
  label: string;
  value: string;
  description?: string;
}

export interface StatsGridProps {
  stats: Stat[];
}

export function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <dt className="text-sm font-medium text-gray-500 truncate dark:text-gray-400">
            {stat.label}
          </dt>
          <dd className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
            {stat.value}
          </dd>
          {stat.description && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {stat.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
