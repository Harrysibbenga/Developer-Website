export async function initializeSystem(config = {}) {
  try {
    console.log('🔧 Initializing system with config:', config)
    
    // Dynamic import for production compatibility
    const { default: SystemManager } = await import('../utils/core/SystemManager.js')
    const systemManager = SystemManager.getInstance(config)
    await systemManager.initialize()
    
    return systemManager
  } catch (error) {
    console.error('❌ System initialization failed:', error)
    throw error
  }
}

export function autoInitialize(config = {}) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initializeSystem(config))
  } else {
    initializeSystem(config)
  }
}

// Make available globally for legacy compatibility
if (typeof window !== 'undefined') {
  window.systemInit = {
    initialize: initializeSystem,
    autoInitialize: autoInitialize
  }
}