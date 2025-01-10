/**
 * @fileoverview Context provider for managing user preferences and local storage
 */

import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UserPreferences, defaultPreferences } from "./types";
import { UserPreferencesContext } from "./context";

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

  const validateFontSize = (
    size: unknown
  ): size is UserPreferences["fontSize"] => {
    return (
      typeof size === "string" && ["small", "medium", "large"].includes(size)
    );
  };

  const validateMeasurementUnit = (
    unit: unknown
  ): unit is UserPreferences["measurementUnit"] => {
    return typeof unit === "string" && ["metric", "imperial"].includes(unit);
  };

  const updatePreferences = useCallback((updates: Partial<UserPreferences>) => {
    const validateShortcutKey = (key: string): boolean => {
      const validKeyPattern = /^(alt\+)[a-z0-9/]$/;
      return validKeyPattern.test(key);
    };

    const validateShortcuts = (
      shortcuts: unknown
    ): shortcuts is UserPreferences["shortcuts"] => {
      if (typeof shortcuts !== "object" || shortcuts === null) return false;
      const s = shortcuts as UserPreferences["shortcuts"];

      if (typeof s.enabled !== "boolean") return false;
      if (typeof s.customKeys !== "object" || s.customKeys === null)
        return false;

      return Object.entries(s.customKeys).every(
        ([key, action]) =>
          (validateShortcutKey(key) &&
            typeof action === "string" &&
            action.startsWith("go-")) ||
          [
            "toggle-print-mode",
            "toggle-dark-mode",
            "toggle-shortcuts",
          ].includes(action)
      );
    };

    // Validate each field before updating
    if (updates.fontSize !== undefined && !validateFontSize(updates.fontSize)) {
      throw new Error("Invalid font size value");
    }

    if (
      updates.measurementUnit !== undefined &&
      !validateMeasurementUnit(updates.measurementUnit)
    ) {
      throw new Error("Invalid measurement unit value");
    }

    if (
      updates.printMode !== undefined &&
      typeof updates.printMode !== "boolean"
    ) {
      throw new Error("Invalid print mode value");
    }

    if (
      updates.darkMode !== undefined &&
      typeof updates.darkMode !== "boolean"
    ) {
      throw new Error("Invalid dark mode value");
    }

    if (
      updates.shortcuts !== undefined &&
      !validateShortcuts(updates.shortcuts)
    ) {
      throw new Error("Invalid shortcuts configuration");
    }

    setPreferences((prev) => ({ ...prev, ...updates }));
  }, []);

  const resetPreferences = useCallback(() => {
    setPreferences(defaultPreferences);
  }, []);

  const togglePrintMode = useCallback(() => {
    setPreferences((prev) => ({
      ...prev,
      printMode: !prev.printMode,
    }));
  }, []);

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
