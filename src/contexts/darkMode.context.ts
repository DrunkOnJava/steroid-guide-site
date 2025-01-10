/**
 * @fileoverview Dark mode context definition
 */

import { createContext } from "react";
import { DarkModeContextType } from "./darkMode.types";

export const DarkModeContext = createContext<DarkModeContextType | undefined>(
  undefined
);
