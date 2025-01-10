/**
 * @fileoverview Profile context definition
 */

import { createContext } from "react";
import { ProfileContextType } from "./profile.types";

export const ProfileContext = createContext<ProfileContextType | null>(null);
