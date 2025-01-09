/**
 * @fileoverview Context provider for managing user preferences and local storage
 */

import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserPreferences {
  fontSize: "small" | "medium" | "large";
  measurementUnit: "metric" | "imperial";
  printMode: boolean;
  shortcuts: {
    enabled: boolean;
    customKeys: Record<string, string>;
  };
  darkMode?: boolean;
}

const defaultPreferences: UserPreferences = {
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

interface UserPreferencesContextType {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
  togglePrintMode: () => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextType | null>(
  null
);

export function UserPreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    const stored = localStorage.getItem("userPreferences");
    return stored
      ? { ...defaultPreferences, ...JSON.parse(stored) }
      : defaultPreferences;
  });

  const updatePreferences = (updates: Partial<UserPreferences>) => {
    setPreferences((prev) => ({ ...prev, ...updates }));
  };

  const resetPreferences = () => {
    setPreferences(defaultPreferences);
  };

  const togglePrintMode = () => {
    setPreferences((prev) => ({
      ...prev,
      printMode: !prev.printMode,
    }));
  };

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (preferences.shortcuts.enabled) {
      const handleKeyDown = (e: KeyboardEvent) => {
        const key = `${e.altKey ? "alt+" : ""}${e.key.toLowerCase()}`;
        const action = preferences.shortcuts.customKeys[key];
        if (action) {
          e.preventDefault();
          switch (action) {
            case "toggle-print-mode":
              togglePrintMode();
              break;
            case "toggle-dark-mode":
              updatePreferences({ darkMode: !preferences.darkMode });
              break;
            case "toggle-shortcuts":
              updatePreferences({
                shortcuts: {
                  ...preferences.shortcuts,
                  enabled: !preferences.shortcuts.enabled,
                },
              });
              break;
            // Navigation shortcuts
            case "go-home":
              navigate("/");
              break;
            case "go-safety":
              navigate("/safety");
              break;
            case "go-compounds":
              navigate("/compounds");
              break;
            case "go-faq":
              navigate("/faq");
              break;
            case "go-glossary":
              navigate("/glossary");
              break;
            case "go-training":
              navigate("/training-nutrition");
              break;
            case "go-overview":
              navigate("/cycle-overview");
              break;
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [
    preferences.shortcuts,
    preferences.darkMode,
    navigate,
    togglePrintMode,
    updatePreferences,
  ]);

  return (
    <UserPreferencesContext.Provider
      value={{
        preferences,
        updatePreferences,
        resetPreferences,
        togglePrintMode,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
}

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
}
