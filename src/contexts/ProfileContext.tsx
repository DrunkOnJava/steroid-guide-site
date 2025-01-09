/**
 * @fileoverview Context provider for managing user profiles, cycles, and schedules
 */

import { createContext, useContext, useEffect, useState } from "react";
interface Cycle {
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

interface Schedule {
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

interface Profile {
  id: string;
  name: string;
  cycles: Cycle[];
  schedules: Schedule[];
  lastBackup?: string;
}

interface ProfileContextType {
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

const ProfileContext = createContext<ProfileContextType | null>(null);

const STORAGE_KEY = "steroidGuideProfiles";
const BACKUP_KEY = "steroidGuideBackup";

// Encryption helper using Web Crypto API
const encryptData = async (data: string): Promise<string> => {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);

  // Generate a random key
  const key = await window.crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt"]
  );

  // Generate a random IV
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  // Encrypt the data
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    dataBuffer
  );

  // Export the key
  const exportedKey = await window.crypto.subtle.exportKey("raw", key);

  // Combine IV, key, and encrypted data
  const combined = new Uint8Array(
    iv.length + exportedKey.byteLength + encryptedData.byteLength
  );
  combined.set(iv);
  combined.set(new Uint8Array(exportedKey), iv.length);
  combined.set(
    new Uint8Array(encryptedData),
    iv.length + exportedKey.byteLength
  );

  return btoa(String.fromCharCode(...combined));
};

// Decryption helper
const decryptData = async (encryptedString: string): Promise<string> => {
  const combined = new Uint8Array(
    atob(encryptedString)
      .split("")
      .map((c) => c.charCodeAt(0))
  );

  const iv = combined.slice(0, 12);
  const keyData = combined.slice(12, 44);
  const encryptedData = combined.slice(44);

  const key = await window.crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "AES-GCM", length: 256 },
    true,
    ["decrypt"]
  );

  const decryptedData = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encryptedData
  );

  return new TextDecoder().decode(decryptedData);
};

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<Profile[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [activeProfile, setActiveProfileState] = useState<Profile | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const setActiveProfile = (profileId: string) => {
    const profile = profiles.find((p) => p.id === profileId);
    setActiveProfileState(profile || null);
  };

  const addProfile = (name: string) => {
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name,
      cycles: [],
      schedules: [],
    };
    setProfiles((prev) => [...prev, newProfile]);
  };

  const updateProfile = (profileId: string, updates: Partial<Profile>) => {
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === profileId ? { ...profile, ...updates } : profile
      )
    );
  };

  const deleteProfile = (profileId: string) => {
    setProfiles((prev) => prev.filter((profile) => profile.id !== profileId));
    if (activeProfile?.id === profileId) {
      setActiveProfileState(null);
    }
  };

  const exportData = (profileId?: string) => {
    const dataToExport = profileId
      ? profiles.find((p) => p.id === profileId)
      : profiles;
    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `steroid-guide-data-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (jsonData: string) => {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        setProfiles(imported);
      } else if (typeof imported === "object") {
        setProfiles((prev) => [...prev, imported]);
      }
    } catch (error) {
      console.error("Failed to import data:", error);
      throw new Error("Invalid data format");
    }
  };

  const backupData = async () => {
    try {
      const encryptedData = await encryptData(JSON.stringify(profiles));
      localStorage.setItem(BACKUP_KEY, encryptedData);
      const timestamp = new Date().toISOString();
      setProfiles((prev) =>
        prev.map((profile) => ({ ...profile, lastBackup: timestamp }))
      );
    } catch (error) {
      console.error("Failed to backup data:", error);
      throw new Error("Backup failed");
    }
  };

  const restoreBackup = async () => {
    try {
      const encryptedBackup = localStorage.getItem(BACKUP_KEY);
      if (!encryptedBackup) throw new Error("No backup found");

      const decryptedData = await decryptData(encryptedBackup);
      const restoredProfiles = JSON.parse(decryptedData);
      setProfiles(restoredProfiles);
    } catch (error) {
      console.error("Failed to restore backup:", error);
      throw new Error("Restore failed");
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        activeProfile,
        setActiveProfile,
        addProfile,
        updateProfile,
        deleteProfile,
        exportData,
        importData,
        backupData,
        restoreBackup,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
}
