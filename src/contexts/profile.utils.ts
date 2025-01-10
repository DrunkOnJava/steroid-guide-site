/**
 * @fileoverview Utility functions for profile data encryption and decryption
 */

// Encryption helper using Web Crypto API
export const encryptData = async (data: string): Promise<string> => {
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
export const decryptData = async (encryptedString: string): Promise<string> => {
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
