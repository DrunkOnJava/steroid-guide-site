import { useEffect, useState, ReactNode } from "react";
import { ColorMode } from "./darkMode.types";
import { DarkModeContext } from "./darkMode.context";

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    const stored = localStorage.getItem("colorMode") as ColorMode;
    return stored || "system";
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) =>
      setSystemPrefersDark(e.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const isDarkMode =
    colorMode === "system" ? systemPrefersDark : colorMode === "dark";

  useEffect(() => {
    localStorage.setItem("colorMode", colorMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [colorMode, isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, colorMode, setColorMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
