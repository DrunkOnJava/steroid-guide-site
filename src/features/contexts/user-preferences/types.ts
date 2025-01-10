/**
 * @fileoverview Type definitions for user preferences
 */

export interface UserPreferences {
  fontSize: "small" | "medium" | "large";
  measurementUnit: "metric" | "imperial";
  printMode: boolean;
  shortcuts: {
    enabled: boolean;
    customKeys: Record<string, string>;
  };
  darkMode?: boolean;
}

export interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  togglePrintMode: () => void;
}

export const defaultPreferences: UserPreferences = {
  fontSize: "medium",
  measurementUnit: "metric",
  printMode: false,
  shortcuts: {
    enabled: true,
    customKeys: {
      "alt+p": "toggle-print-mode",
      "alt+d": "toggle-dark-mode",
      "alt+/": "toggle-shortcuts",
      // Navigation shortcuts
      "alt+h": "go-home",
      "alt+s": "go-safety",
      "alt+c": "go-compounds",
      "alt+f": "go-faq",
      "alt+g": "go-glossary",
      "alt+t": "go-training",
      "alt+o": "go-overview",
    },
  },
};
