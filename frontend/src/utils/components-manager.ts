// src/utils/components-manager.ts
/**
 * Legacy Components Manager - Now delegates to Enhanced Components Manager
 * Provides backward compatibility while using the new system
 */

import { enhancedComponentsManager } from './enhanced-components-manager'
import { initializePortfolioFiltering } from './portfolio-filter-utility'

export class GlobalComponentsManager {
  private static instance: GlobalComponentsManager
  private initialized = false

  private constructor() {}

  public static getInstance(): GlobalComponentsManager {
    if (!GlobalComponentsManager.instance) {
      GlobalComponentsManager.instance = new GlobalComponentsManager()
    }
    return GlobalComponentsManager.instance
  }

  public async initialize(): Promise<void> {
    if (this.initialized) return

    console.log('🔄 Legacy Components Manager: Delegating to Enhanced Manager...')
    
    // Delegate to the enhanced manager
    await enhancedComponentsManager.initialize()
    enhancedComponentsManager.setupPageTransitions()
    
    this.initialized = true
    console.log('✅ Legacy Components Manager: Delegation complete')
  }

  public async reinitialize(): Promise<void> {
    this.initialized = false
    return this.initialize()
  }

  public initializeSpecificComponent(componentType: string): void {
    console.log(`🔧 Initializing specific component: ${componentType}`)
    
    switch (componentType) {
      case 'portfolio':
      case 'filters':
        const portfolioSection = document.getElementById('all-projects-section')
        if (portfolioSection) {
          initializePortfolioFiltering(portfolioSection)
        }
        break
      default:
        console.warn(`Unknown component type: ${componentType}`)
    }
  }

  // Legacy method for backward compatibility
  public cleanup(): void {
    console.log('🧹 Legacy cleanup - enhanced manager handles this automatically')
  }
}

// Export singleton instance for backward compatibility
export const componentsManager = GlobalComponentsManager.getInstance()

// Also export the enhanced manager for direct access
export { enhancedComponentsManager }