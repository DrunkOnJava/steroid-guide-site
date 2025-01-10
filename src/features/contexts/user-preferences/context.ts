[object Promise]import { createContext, useContext } from "react";
import { UserPreferencesContextType } from "./types";

export const UserPreferencesContext = createContext<
  UserPreferencesContextType | undefined
>(undefined);

export function useUserPreferences() {
  const context = useContext(UserPreferencesContext);
  if (context === undefined) {
    throw new Error(
      "useUserPreferences must be used within a UserPreferencesProvider"
    );
  }
  return context;
}
