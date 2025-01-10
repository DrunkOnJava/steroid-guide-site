/**
 * @fileoverview Type definitions for user profiles, cycles, and schedules
 */

export interface Cycle {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  compounds: Array<{
    name: string;
    dosage: number;
    frequency: string;
    unit: string;
  }>;
  notes?: string;
}

export interface Schedule {
  id: string;
  cycleId: string;
  date: string;
  completed: boolean;
  medications: Array<{
    name: string;
    dosage: number;
    unit: string;
    timeOfDay: string;
    taken: boolean;
  }>;
}

export interface Profile {
  id: string;
  name: string;
  cycles: Cycle[];
  schedules: Schedule[];
  lastBackup?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileContextType {
  profiles: Profile[];
  activeProfile: Profile | null;
  setActiveProfile: (profileId: string) => void;
  addProfile: (name: string) => void;
  updateProfile: (profileId: string, updates: Partial<Profile>) => void;
  deleteProfile: (profileId: string) => void;
  exportData: (profileId?: string) => void;
  importData: (jsonData: string) => void;
  backupData: () => Promise<void>;
  restoreBackup: () => Promise<void>;
}

export const STORAGE_KEY = "steroidGuideProfiles";
export const BACKUP_KEY = "steroidGuideBackup";
