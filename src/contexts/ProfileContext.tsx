/**
 * @fileoverview React context provider for managing user profiles
 */

import { useEffect, useState } from "react";
import { Profile, STORAGE_KEY, BACKUP_KEY } from "./profile.types";
import { encryptData, decryptData } from "./profile.utils";
import { ProfileContext } from "./profile.context";

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
    if (!name || name.trim().length === 0) {
      throw new Error("Profile name is required");
    }
    if (name.length > 50) {
      throw new Error("Profile name must be less than 50 characters");
    }
    if (profiles.some((p) => p.name === name)) {
      throw new Error("Profile name must be unique");
    }

    const timestamp = new Date().toISOString();
    const newProfile: Profile = {
      id: crypto.randomUUID(),
      name: name.trim(),
      cycles: [],
      schedules: [],
      createdAt: timestamp,
      updatedAt: timestamp,
    };
    setProfiles((prev) => [...prev, newProfile]);
  };

  const updateProfile = (profileId: string, updates: Partial<Profile>) => {
    if (!profileId) {
      throw new Error("Profile ID is required");
    }
    if (!profiles.some((p) => p.id === profileId)) {
      throw new Error("Profile not found");
    }
    if (updates.name) {
      if (updates.name.trim().length === 0) {
        throw new Error("Profile name cannot be empty");
      }
      if (updates.name.length > 50) {
        throw new Error("Profile name must be less than 50 characters");
      }
      if (profiles.some((p) => p.id !== profileId && p.name === updates.name)) {
        throw new Error("Profile name must be unique");
      }
    }
    const timestamp = new Date().toISOString();
    setProfiles((prev) =>
      prev.map((profile) =>
        profile.id === profileId
          ? { ...profile, ...updates, updatedAt: timestamp }
          : profile
      )
    );
  };

  const deleteProfile = (profileId: string) => {
    if (!profileId) {
      throw new Error("Profile ID is required");
    }
    if (!profiles.some((p) => p.id === profileId)) {
      throw new Error("Profile not found");
    }
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
    if (!jsonData || jsonData.trim().length === 0) {
      throw new Error("Import data is required");
    }

    try {
      const imported = JSON.parse(jsonData);

      // Validate imported data structure
      const validateProfile = (profile: unknown): profile is Profile => {
        return (
          typeof profile === "object" &&
          profile !== null &&
          typeof (profile as Profile).id === "string" &&
          typeof (profile as Profile).name === "string" &&
          Array.isArray((profile as Profile).cycles) &&
          Array.isArray((profile as Profile).schedules)
        );
      };

      if (Array.isArray(imported)) {
        if (!imported.every(validateProfile)) {
          throw new Error("Invalid profile data structure");
        }
        setProfiles(imported);
      } else if (validateProfile(imported)) {
        setProfiles((prev) => [...prev, imported]);
      } else {
        throw new Error("Invalid data format");
      }
    } catch (error) {
      console.error("Failed to import data:", error);
      throw new Error(
        error instanceof Error ? error.message : "Invalid data format"
      );
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
