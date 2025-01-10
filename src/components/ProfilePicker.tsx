/**
 * @fileoverview Component for selecting and managing user profiles
 */

import { useState } from "react";
import { useProfile } from "../contexts/profile.hooks";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

export function ProfilePicker() {
  const {
    profiles,
    activeProfile,
    setActiveProfile,
    addProfile,
    deleteProfile,
    exportData,
    importData,
    backupData,
    restoreBackup,
  } = useProfile();

  const [newProfileName, setNewProfileName] = useState("");
  const [importFile, setImportFile] = useState<File | null>(null);

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      addProfile(newProfileName.trim());
      setNewProfileName("");
    }
  };

  const handleImport = async () => {
    if (!importFile) return;
    try {
      const text = await importFile.text();
      importData(text);
      setImportFile(null);
    } catch (error) {
      console.error("Failed to import file:", error);
      alert("Failed to import file. Please ensure it's a valid JSON file.");
    }
  };

  const handleBackup = async () => {
    try {
      await backupData();
      alert("Backup created successfully!");
    } catch (error) {
      console.error("Failed to create backup:", error);
      alert("Failed to create backup. Please try again.");
    }
  };

  const handleRestore = async () => {
    try {
      await restoreBackup();
      alert("Backup restored successfully!");
    } catch (error) {
      console.error("Failed to restore backup:", error);
      alert("Failed to restore backup. Please try again.");
    }
  };

  return (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow dark:bg-gray-800">
      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Input
            label="New Profile Name"
            value={newProfileName}
            onChange={(e) => setNewProfileName(e.target.value)}
            placeholder="Enter profile name"
          />
        </div>
        <Button onClick={handleAddProfile}>Add Profile</Button>
      </div>

      <div className="flex items-end gap-4">
        <div className="flex-1">
          <Select
            label="Active Profile"
            value={activeProfile?.id || ""}
            onChange={(e) => setActiveProfile(e.target.value)}
            placeholder="Select a profile"
            options={profiles.map((profile) => ({
              value: profile.id,
              label: profile.name,
            }))}
          />
        </div>
        {activeProfile && (
          <Button
            variant="danger"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this profile? This action cannot be undone."
                )
              ) {
                deleteProfile(activeProfile.id);
              }
            }}
          >
            Delete Profile
          </Button>
        )}
      </div>

      <div className="pt-4 mt-4 border-t">
        <h3 className="mb-4 text-lg font-semibold">Data Management</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium">Import/Export</h4>
            <div className="space-y-2">
              <input
                type="file"
                accept=".json"
                onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                aria-label="Import profile data"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleImport}
                  disabled={!importFile}
                  className="flex-1"
                >
                  Import
                </Button>
                <Button
                  onClick={() => exportData(activeProfile?.id)}
                  className="flex-1"
                >
                  Export
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Backup</h4>
            <div className="flex gap-2">
              <Button onClick={handleBackup} className="flex-1">
                Create Backup
              </Button>
              <Button onClick={handleRestore} className="flex-1">
                Restore Backup
              </Button>
            </div>
            {activeProfile?.lastBackup && (
              <p className="mt-2 text-sm text-gray-500">
                Last backup:{" "}
                {new Date(activeProfile.lastBackup).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
