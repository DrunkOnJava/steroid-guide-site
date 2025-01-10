import { createContext, useContext } from "react";
import { DarkModeContextType } from "./types";

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
