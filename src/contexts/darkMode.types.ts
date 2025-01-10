/**
 * @fileoverview Type definitions for dark mode functionality
 */

export type ColorMode = "light" | "dark" | "system";

export interface DarkModeContextType {
  isDarkMode: boolean;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}
