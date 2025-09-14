// src/utils/core/init.ts
/**
 * System Initialization Entry Point
 * This is the main file that gets imported by the layout
 */

import SystemManager from './SystemManager'

export interface SystemConfig {
  gaId?: string
  enableAnalytics?: boolean
  debugMode?: boolean
}

/**
 * Initialize the entire system
 */
export async function initializeSystem(config: SystemConfig = {}): Promise<SystemManager> {
  try {
    if (config.debugMode) {
      console.log('🔧 Debug mode enabled')
    }

    const systemManager = SystemManager.getInstance(config)
    await systemManager.initialize()
    
    return systemManager
  } catch (error) {
    console.error('System initialization failed:', error)
    throw error
  }
}

/**
 * Get the current system manager instance
 */
export function getSystemManager(): SystemManager | null {
  return window.systemManager || null
}

/**
 * Legacy compatibility functions
 */
export const legacyAPI = {
  // For backward compatibility with existing code
  initializePortfolioFilters: () => {
    const manager = getSystemManager()
    const portfolioModule = manager?.getModule('portfolio')
    return portfolioModule
  },
  
  initializeContactTabs: () => {
    const manager = getSystemManager()
    const contactModule = manager?.getModule('contact')
    return contactModule
  },
  
  reinitializeAll: async () => {
    const manager = getSystemManager()
    if (manager) {
      await manager.reinitialize()
    }
  }
}

// Export individual modules for direct import if needed
export { SystemManager }
export { BaseModule } from './modules/BaseModule'
export { CookieManager } from './modules/CookieManager'
export { AnalyticsManager } from './modules/AnalyticsManager'

// Make system available globally for debugging
if (typeof window !== 'undefined') {
  window.__SYSTEM_API__ = {
    getManager: getSystemManager,
    reinitialize: legacyAPI.reinitializeAll,
    modules: () => {
      const manager = getSystemManager()
      return manager ? Object.fromEntries(manager['modules'] || []) : {}
    }
  }
}

declare global {
  interface Window {
    __SYSTEM_API__: {
      getManager: () => SystemManager | null
      reinitialize: () => Promise<void>
      modules: () => Record<string, any>
    }
  }
}