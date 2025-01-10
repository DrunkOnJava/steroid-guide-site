/**
 * @fileoverview Custom hooks for profile functionality
 */

import { useContext } from "react";
import { ProfileContext } from "./profile.context";
import { ProfileContextType } from "./profile.types";

export function useProfile(): ProfileContextType {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
