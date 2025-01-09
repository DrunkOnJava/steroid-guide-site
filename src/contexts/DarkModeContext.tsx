import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ColorMode = "light" | "dark" | "system";

interface DarkModeContextType {
  isDarkMode: boolean;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

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

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
