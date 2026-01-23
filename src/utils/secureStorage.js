/**
 * Secure Storage Utility
 * Encrypts sensitive data before storing in localStorage
 * Uses Web Crypto API for AES-GCM encryption
 */

// Storage key for the encryption key
const KEY_STORAGE_NAME = 'app_secure_key'
const ENCRYPTED_PREFIX = 'enc:'

// Cache the encryption key in memory
let cachedKey = null

/**
 * Generate or retrieve the encryption key
 * Key is stored in localStorage (base64 encoded) for persistence
 */
async function getEncryptionKey() {
  if (cachedKey) {
    return cachedKey
  }

  try {
    // Try to retrieve existing key
    const storedKey = localStorage.getItem(KEY_STORAGE_NAME)
    if (storedKey) {
      const keyData = base64ToArrayBuffer(storedKey)
      cachedKey = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      )
      return cachedKey
    }

    // Generate new key
    cachedKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    // Export and store the key
    const exportedKey = await crypto.subtle.exportKey('raw', cachedKey)
    localStorage.setItem(KEY_STORAGE_NAME, arrayBufferToBase64(exportedKey))

    return cachedKey
  } catch (error) {
    console.error('Failed to get encryption key:', error)
    throw error
  }
}

/**
 * Encrypt data using AES-GCM
 * @param {string} data - Data to encrypt
 * @returns {Promise<string>} - Encrypted data as base64 string
 */
async function encrypt(data) {
  try {
    const key = await getEncryptionKey()

    // Generate random IV
    const iv = crypto.getRandomValues(new Uint8Array(12))

    // Encode data
    const encoder = new TextEncoder()
    const encodedData = encoder.encode(data)

    // Encrypt
    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedData
    )

    // Combine IV and encrypted data, then encode as base64
    const combined = new Uint8Array(iv.length + encryptedData.byteLength)
    combined.set(iv)
    combined.set(new Uint8Array(encryptedData), iv.length)

    return ENCRYPTED_PREFIX + arrayBufferToBase64(combined.buffer)
  } catch (error) {
    console.error('Encryption failed:', error)
    throw error
  }
}

/**
 * Decrypt data using AES-GCM
 * @param {string} encryptedData - Encrypted data as base64 string
 * @returns {Promise<string>} - Decrypted data
 */
async function decrypt(encryptedData) {
  try {
    // Check if data is encrypted
    if (!encryptedData.startsWith(ENCRYPTED_PREFIX)) {
      // Return as-is if not encrypted (backward compatibility)
      return encryptedData
    }

    const key = await getEncryptionKey()

    // Remove prefix and decode base64
    const combined = base64ToArrayBuffer(encryptedData.slice(ENCRYPTED_PREFIX.length))

    // Extract IV and encrypted data
    const iv = combined.slice(0, 12)
    const data = combined.slice(12)

    // Decrypt
    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    )

    // Decode to string
    const decoder = new TextDecoder()
    return decoder.decode(decryptedData)
  } catch (error) {
    console.error('Decryption failed:', error)
    throw error
  }
}

/**
 * Secure storage wrapper for localStorage
 */
export const secureStorage = {
  /**
   * Store encrypted data
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   */
  async setItem(key, value) {
    try {
      const stringValue = JSON.stringify(value)
      const encrypted = await encrypt(stringValue)
      localStorage.setItem(key, encrypted)
    } catch (error) {
      console.error('secureStorage.setItem failed:', error)
      // Fallback to unencrypted storage
      localStorage.setItem(key, JSON.stringify(value))
    }
  },

  /**
   * Retrieve and decrypt data
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if key doesn't exist
   * @returns {Promise<*>} - Decrypted value
   */
  async getItem(key, defaultValue = null) {
    try {
      const stored = localStorage.getItem(key)
      if (!stored) {
        return defaultValue
      }

      const decrypted = await decrypt(stored)
      return JSON.parse(decrypted)
    } catch (error) {
      console.error('secureStorage.getItem failed:', error)
      return defaultValue
    }
  },

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   */
  removeItem(key) {
    localStorage.removeItem(key)
  },

  /**
   * Clear all secure storage (keeps encryption key)
   */
  clear() {
    const encryptionKey = localStorage.getItem(KEY_STORAGE_NAME)
    localStorage.clear()
    if (encryptionKey) {
      localStorage.setItem(KEY_STORAGE_NAME, encryptionKey)
    }
  },

  /**
   * Migrate existing unencrypted data to encrypted format
   * @param {string[]} keys - Keys to migrate
   */
  async migrateToEncrypted(keys) {
    for (const key of keys) {
      try {
        const stored = localStorage.getItem(key)
        if (stored && !stored.startsWith(ENCRYPTED_PREFIX)) {
          // Re-store with encryption
          const value = JSON.parse(stored)
          await this.setItem(key, value)
        }
      } catch (error) {
        console.error(`Failed to migrate key ${key}:`, error)
      }
    }
  }
}

// Helper functions
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

export default secureStorage
