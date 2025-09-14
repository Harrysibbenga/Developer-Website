// src/scripts/system-init.js
// Client-side entry point for the modular system

import SystemManager from '../utils/core/SystemManager.js'

/**
 * Initialize the system with configuration
 */
export async function initializeSystem(config = {}) {
  try {
    console.log('🔧 Initializing system with config:', config)
    
    const systemManager = SystemManager.getInstance(config)
    await systemManager.initialize()
    
    return systemManager
  } catch (error) {
    console.error('❌ System initialization failed:', error)
    throw error
  }
}

/**
 * Initialize system on DOM ready
 */
export function autoInitialize(config = {}) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeSystem(config))
  } else {
    initializeSystem(config)
  }
}

// Make available globally for legacy compatibility
window.systemInit = {
  initialize: initializeSystem,
  autoInitialize: autoInitialize
}