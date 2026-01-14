/**
 * Clerk Client Configuration
 */

import { Clerk } from '@clerk/clerk-js'

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

let clerkInstance = null

export async function initClerk() {
  if (!clerkPublishableKey) {
    console.warn('Clerk publishable key not configured. Auth features will be disabled.')
    return null
  }

  if (clerkInstance) {
    return clerkInstance
  }

  clerkInstance = new Clerk(clerkPublishableKey)
  await clerkInstance.load()

  return clerkInstance
}

export function getClerk() {
  return clerkInstance
}

export default { initClerk, getClerk }
