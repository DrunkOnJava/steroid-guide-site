/**
 * @fileoverview User preferences context definition
 */

import { createContext } from "react";
import { UserPreferencesContextType } from "./userPreferences.types";

export const UserPreferencesContext =
  createContext<UserPreferencesContextType | null>(null);
