/**
 * @fileoverview User preferences hooks
 */

import { useContext } from "react";
import { UserPreferencesContext } from "./userPreferences.context";
import { UserPreferencesContextType } from "./userPreferences.types";

export const useUserPreferences = (): UserPreferencesContextType => {
  const context = useContext(UserPreferencesContext);
  if (!context) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
};
