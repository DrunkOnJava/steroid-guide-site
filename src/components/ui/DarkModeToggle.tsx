[object Promise]import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useDarkMode } from "../../contexts/darkMode.hooks";

export default function DarkModeToggle() {
  const { colorMode, setColorMode } = useDarkMode();

  const cycleMode = () => {
    const modes: ["light", "dark", "system"] = ["light", "dark", "system"];
    const currentIndex = modes.indexOf(colorMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setColorMode(modes[nextIndex]);
  };

  return (
    <button
      onClick={cycleMode}
      className="p-2 text-gray-500 transition-colors rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
      aria-label={`Current theme: ${colorMode}. Click to cycle theme.`}
    >
      {colorMode === "light" && (
        <SunIcon className="w-5 h-5" aria-hidden="true" />
      )}
      {colorMode === "dark" && (
        <MoonIcon className="w-5 h-5" aria-hidden="true" />
      )}
      {colorMode === "system" && (
        <ComputerDesktopIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  );
}
