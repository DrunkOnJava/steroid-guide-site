/**
 * Debounce function to limit how often a function can be called
 * @template T - Function type with proper typing for parameters and return value
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to wait before calling the function
 * @returns A debounced version of the function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: typeof func, ...args: Parameters<T>): void {
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      func.apply(this, args);
      timeout = null;
    }, wait);
  };
}
