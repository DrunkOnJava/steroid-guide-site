/**
 * @fileoverview Dark mode hooks
 */

import { useContext } from "react";
import { DarkModeContext } from "./darkMode.context";
import { DarkModeContextType } from "./darkMode.types";

export const useDarkMode = (): DarkModeContextType => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
